import { BadRequestException, Logger, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { PasswordChangeInput } from './dto/password-change.input'
import {
  AuthPayload,
  EmailExists,
  PasswordChangePayload,
  PasswordExists,
  TokenCheck,
} from './entities/auth.entity'
import { GqlAuthGuard } from './gql-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Resolver(() => User)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name)

  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => AuthPayload)
  async signup(
    @Args('credentials') credentials: CredentialsSignup,
    @Context('res') _res: Response,
  ): Promise<AuthPayload> {
    // ✅ Input validation
    if (!credentials) {
      this.logger.error('signup mutation failed - No credentials provided')
      throw new BadRequestException('Credentials are required')
    }

    if (!credentials.email?.trim()) {
      this.logger.error('signup mutation failed - Email is required')
      throw new BadRequestException('Email is required')
    }

    if (!credentials.password?.trim()) {
      this.logger.error('signup mutation failed - Password is required')
      throw new BadRequestException('Password is required')
    }

    if (!credentials.firstName?.trim()) {
      this.logger.error('signup mutation failed - First name is required')
      throw new BadRequestException('First name is required')
    }

    if (!credentials.lastName?.trim()) {
      this.logger.error('signup mutation failed - Last name is required')
      throw new BadRequestException('Last name is required')
    }

    this.logger.log(`Processing signup for email: ${credentials.email}`)

    const { userErrors, user } = await this.authService.signup(credentials)
    if (user) {
      const userName = `${user.firstName} ${user.lastName}`
      await this.emailConfirmationService.sendVerificationLink(
        userName,
        user.email,
      )
      this.logger.log(`Signup successful for user ID: ${user.id}`)
    }
    else if (userErrors.length > 0) {
      this.logger.warn(
        `Signup failed for email ${credentials.email}: ${userErrors.map(e => e.message).join(', ')}`,
      )
    }

    return { userErrors, user }
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('credentials') credentials: CredentialsSignin,
    @Context() context,
  ): Promise<AuthPayload> {
    // ✅ Input validation
    if (!credentials) {
      this.logger.error('signin mutation failed - No credentials provided')
      throw new BadRequestException('Credentials are required')
    }

    if (!credentials.email?.trim()) {
      this.logger.error('signin mutation failed - Email is required')
      throw new BadRequestException('Email is required')
    }

    if (!credentials.password?.trim()) {
      this.logger.error('signin mutation failed - Password is required')
      throw new BadRequestException('Password is required')
    }

    this.logger.log(`Processing signin for email: ${credentials.email}`)

    const { userErrors, diatonicToken, user } = await this.authService.signin(
      context.user,
    )

    if (diatonicToken) {
      context.res.cookie('diatonicToken', diatonicToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: this.configService.get('NODE_ENV') === 'production',
        domain: this.configService.get('COOKIE_DOMAIN'),
        path: '/',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      })
      this.logger.log(`Signin successful for user ID: ${user?.id}`)
    }
    else if (userErrors.length > 0) {
      this.logger.warn(
        `Signin failed for email ${credentials.email}: ${userErrors.map(e => e.message).join(', ')}`,
      )
    }

    return { userErrors, diatonicToken, user }
  }

  @Query(() => EmailExists)
  async passwordChangeEmailVerification(
    @Args('email', { type: () => String }) email: User['email'],
  ) {
    // ✅ Input validation
    if (!email?.trim()) {
      this.logger.error('passwordChangeEmailVerification query failed - Email is required')
      throw new BadRequestException('Email is required')
    }

    // Basic email format validation
    if (!email.includes('@') || !email.includes('.')) {
      this.logger.error(`passwordChangeEmailVerification query failed - Invalid email format: ${email}`)
      throw new BadRequestException('Invalid email format')
    }

    this.logger.log(`Processing password change email verification for: ${email}`)

    const user = await this.authService.findOne(email)
    if (user) {
      await this.authService.setPasswordChangePending(user.id)
      await this.emailConfirmationService.sendPasswordResetLink(user.email)
      this.logger.log(`Password reset link sent to: ${email}`)
      return { email: user.email }
    }

    this.logger.warn(`Password reset requested for non-existent email: ${email}`)
    return { email }
  }

  @Mutation(() => PasswordChangePayload)
  async passwordChange(
    @Args('passwordChangeInput') passwordChangeInput: PasswordChangeInput,
  ): Promise<PasswordChangePayload> {
    // ✅ Input validation
    if (!passwordChangeInput) {
      this.logger.error('passwordChange mutation failed - No input provided')
      throw new BadRequestException('Password change input is required')
    }

    if (!passwordChangeInput.password1?.trim()) {
      this.logger.error('passwordChange mutation failed - Password1 is required')
      throw new BadRequestException('New password is required')
    }

    if (!passwordChangeInput.password2?.trim()) {
      this.logger.error('passwordChange mutation failed - Password2 is required')
      throw new BadRequestException('Password confirmation is required')
    }

    if (!passwordChangeInput.resetToken?.trim()) {
      this.logger.error('passwordChange mutation failed - Reset token is required')
      throw new BadRequestException('Reset token is required')
    }

    this.logger.log('Processing password change request')

    if (passwordChangeInput.password1 !== passwordChangeInput.password2) {
      this.logger.warn('Password change failed - Passwords do not match')
      return {
        userErrors: [
          {
            message: 'Passwords do not match',
            field: ['password1', 'password2'],
          },
        ],
        passwordChanged: false,
      }
    }

    const email = await this.authService.emailFromToken(
      passwordChangeInput.resetToken,
    )

    if (!email) {
      this.logger.error('Password change failed - Invalid or expired reset token')
      return {
        userErrors: [
          {
            message: 'Invalid or expired reset token',
            field: ['resetToken'],
          },
        ],
        passwordChanged: false,
      }
    }

    const { userErrors, passwordChanged }
      = await this.authService.passwordChange(
        email,
        passwordChangeInput.password1,
      )

    if (passwordChanged) {
      this.logger.log(`Password successfully changed for email: ${email}`)
    }
    else {
      this.logger.warn(`Password change failed for email ${email}: ${userErrors.map(e => e.message).join(', ')}`)
    }

    return { userErrors, passwordChanged }
  }

  @Query(() => User, { nullable: true })
  async checkUser(@Args('email', { type: () => String }) email: User['email']) {
    // ✅ Input validation
    if (!email?.trim()) {
      this.logger.error('checkUser query failed - Email is required')
      throw new BadRequestException('Email is required')
    }

    // Basic email format validation
    if (!email.includes('@') || !email.includes('.')) {
      this.logger.error(`checkUser query failed - Invalid email format: ${email}`)
      throw new BadRequestException('Invalid email format')
    }

    this.logger.debug(`Checking user existence for email: ${email}`)
    return await this.authService.findOne(email)
  }

  @Query(() => PasswordExists)
  async checkIfPasswordExists(@Args('id', { type: () => Int }) id: User['id']) {
    // ✅ Input validation
    if (!id) {
      this.logger.error('checkIfPasswordExists query failed - User ID is required')
      throw new BadRequestException('User ID is required')
    }

    this.logger.debug(`Checking password existence for user ID: ${id}`)
    return await this.authService.checkIfPasswordExists(id)
  }

  @Query(() => TokenCheck)
  @UseGuards(JwtAuthGuard)
  async tokenCheck(@Context() context) {
    try {
      const token = context.req.cookies.diatonicToken
      if (!token) {
        this.logger.warn('Token check failed - No token found in cookies')
        return {
          userErrors: [{ message: 'No valid token found', field: [] }],
          user: null,
        }
      }

      this.logger.debug('Validating token and retrieving user')
      const tokenUser = await this.authService.validateTokenAndGetUser(token)

      if (!tokenUser) {
        this.logger.warn('Token check failed - Invalid token user')
        return {
          userErrors: [{ message: 'Invalid token', field: [] }],
          user: null,
        }
      }

      const user = {
        id: tokenUser.id,
        email: tokenUser.email,
        isActive: tokenUser.isActive,
        roles: tokenUser.roles,
        permissions: tokenUser.permissions,
      }

      this.logger.debug(`Token validated successfully for user ID: ${user.id}`)
      return { userErrors: [], user }
    }
    catch (error: any) {
      this.logger.error(`Token check failed: ${error.message}`, error.stack)
      return {
        userErrors: [{ message: 'Invalid token', field: [] }],
        user: null,
      }
    }
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context) {
    if (!context.res) {
      this.logger.error('Logout failed - Response object not available')
      throw new BadRequestException('Cannot process logout')
    }

    this.logger.log('Processing logout - clearing authentication cookie')

    context.res.clearCookie('diatonicToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.configService.get('NODE_ENV') === 'production',
      domain: this.configService.get('COOKIE_DOMAIN'),
      path: '/',
    })

    this.logger.log('Logout successful - cookie cleared')
    return 'signedOut'
  }
}
