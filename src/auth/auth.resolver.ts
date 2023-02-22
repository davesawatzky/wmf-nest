import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthPayload } from './entities/auth.entity'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { User } from '../user/entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './gql-auth.guard'

@Resolver(() => User)
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
    const { user }: { user: Partial<User> } = context
    return this.authService.signin(user)
  }
}
