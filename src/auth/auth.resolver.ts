import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthPayload } from './dto/auth.entity'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { User } from '../user/entities/user.entity'
import { UseGuards, Res } from '@nestjs/common'
import { GqlAuthGuard } from './gql-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('credentials') credentials: CredentialsSignup): Promise<AuthPayload> {
    return this.authService.signup(credentials)
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('credentials') credentials: CredentialsSignin,
    @Context('res') res: Response,
    @Context() context) {
    const { userErrors, diatonicToken, user } = await this.authService.signin(context.user)
    res.cookie('diatonicToken', diatonicToken, {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true,
      path:'/',
      domain: 'localhost',
      maxAge: 1000 * 60 * 60 * 1, // 1 hour
    })
    return { userErrors, diatonicToken, user }
  }
}
