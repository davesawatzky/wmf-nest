import {
  Resolver,
  Mutation,
  Args,
  Int,
  Context,
  Query,
  GqlExecutionContext,
  GqlContextType,
} from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthPayload, PasswordExists } from './entities/auth.entity'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { User } from '../user/entities/user.entity'
import { UseGuards, Res } from '@nestjs/common'
import { GqlAuthGuard } from './gql-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service'

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Mutation(() => AuthPayload)
  async signup(
    @Args('credentials') credentials: CredentialsSignup,
    @Context('res') res: Response
  ): Promise<AuthPayload> {
    const { userErrors, user } = await this.authService.signup(credentials)
    const userName = `${user.firstName} ${user.lastName}`
    await this.emailConfirmationService.sendVerificationLink(
      userName,
      user.email
    )
    return { userErrors, user }
  }

  @Query(() => User || null)
  async checkUser(@Args('email', { type: () => String }) email: User['email']) {
    return await this.authService.findOne(email)
  }

  @Query(() => PasswordExists)
  async checkIfPasswordExists(@Args('id', { type: () => Int }) id: User['id']) {
    return await this.authService.checkIfPasswordExists(id)
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('credentials') credentials: CredentialsSignin,
    @Context() context
  ): Promise<AuthPayload> {
    const { userErrors, diatonicToken, user } = await this.authService.signin(
      context.user
    )
    if (!!diatonicToken) {
      context.res.cookie('diatonicToken', diatonicToken, {
        httpOnly: true,
        sameSite: 'Lax',
        domain: 'wmf2024api.diatonic.ca',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      })
    }
    return { userErrors, diatonicToken, user }
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async tokenCheck() {
    return true
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context) {
    context.res.clearCookie('diatonicToken')
    return 'signedOut'
  }
}
