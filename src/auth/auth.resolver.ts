import { UseGuards } from '@nestjs/common'
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
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => AuthPayload)
  async signup(
    @Args('credentials') credentials: CredentialsSignup,
    @Context('res') res: Response,
  ): Promise<AuthPayload> {
    const { userErrors, user } = await this.authService.signup(credentials)
    if (user) {
      const userName = `${user.firstName} ${user.lastName}`
      await this.emailConfirmationService.sendVerificationLink(
        userName,
        user.email,
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
    }
    return { userErrors, diatonicToken, user }
  }

  @Query(() => EmailExists)
  async passwordChangeEmailVerification(
    @Args('email', { type: () => String }) email: User['email'],
  ) {
    const user = await this.authService.findOne(email)
    if (user) {
      await this.authService.setPasswordChangePending(user.id)
      await this.emailConfirmationService.sendPasswordResetLink(user.email)
      return { email: user.email }
    }
    return { email }
  }

  @Mutation(() => PasswordChangePayload)
  async passwordChange(
    @Args('passwordChangeInput') passwordChangeInput: PasswordChangeInput,
  ): Promise<PasswordChangePayload> {
    if (passwordChangeInput.password1 !== passwordChangeInput.password2) {
      return {
        userErrors: [
          {
            message: 'Passwords do not match',
            field: [],
          },
        ],
        passwordChanged: false,
      }
    }
    else {
      const email = await this.authService.emailFromToken(
        passwordChangeInput.resetToken,
      )
      if (email) {
        const { userErrors, passwordChanged }
          = await this.authService.passwordChange(
            email,
            passwordChangeInput.password1,
          )
        return { userErrors, passwordChanged }
      }
      else {
        return {
          userErrors: [
            {
              message: 'Could not change password',
              field: [],
            },
          ],
          passwordChanged: false,
        }
      }
    }
  }

  @Query(() => User, { nullable: true })
  async checkUser(@Args('email', { type: () => String }) email: User['email']) {
    return await this.authService.findOne(email)
  }

  @Query(() => PasswordExists)
  async checkIfPasswordExists(@Args('id', { type: () => Int }) id: User['id']) {
    return await this.authService.checkIfPasswordExists(id)
  }

  @Query(() => TokenCheck)
  @UseGuards(JwtAuthGuard)
  async tokenCheck(@Context() context) {
    try {
      const token = context.req.cookies.diatonicToken
      if (!token) {
        return {
          userErrors: [{ message: 'No valid token found', field: [] }],
          user: null,
        }
      }
      const tokenUser = await this.authService.validateTokenAndGetUser(token)
      const user = {
        id: tokenUser.id,
        email: tokenUser.email,
        isActive: tokenUser.isActive,
        roles: tokenUser.roles,
        permissions: tokenUser.permissions,
      }
      return { userErrors: [], user }
    }
    catch (error) {
      console.error(error)
      return {
        userErrors: [{ message: 'Invalid token', field: [] }],
        user: null,
      }
    }
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context) {
    context.res.clearCookie('diatonicToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.configService.get('NODE_ENV') === 'production',
      domain: this.configService.get('COOKIE_DOMAIN'),
      path: '/',
    })
    return 'signedOut'
  }
}
