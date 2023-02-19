import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { UserService } from 'src/user/user.service'
import {
  AuthPayload,
  CredentialsSignup,
  CredentialsSignin,
  User,
} from 'src/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './gql-auth.guard'
// import { CreateAuthInput } from './dto/create-auth.input'
// import { UpdateAuthInput } from './dto/update-auth.input'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('credentials') credentials: CredentialsSignup) {
    return this.authService.signup(credentials)
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('credentials') credentials: CredentialsSignin,
    @Context() context,
  ): Promise<AuthPayload> {
    return this.authService.signin(context.user)
  }
}
