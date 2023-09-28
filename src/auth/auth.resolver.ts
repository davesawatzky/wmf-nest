import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthPayload } from './dto/auth.entity'
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
    await this.emailConfirmationService.sendVerificationLink(credentials.email)
    return { userErrors, user }
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('credentials') credentials: CredentialsSignin,
    @Context('res') res: Response,
    @Context() context
  ): Promise<AuthPayload> {
    const { userErrors, diatonicToken, user } = await this.authService.signin(
      context.user
    )
    res.cookie('diatonicToken', diatonicToken, {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true,
      path: '/',
      domain: 'localhost',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    })
    return { userErrors, diatonicToken, user }
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async tokenCheck() {
    return true
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async logout(@Context('res') res: Response) {
    res.clearCookie('diatonicToken')
    return 'signedOut'
  }
}
