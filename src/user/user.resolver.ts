import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { User, UserPayload } from './entities/user.entity'
import { UserInput } from './dto/user.input'
import { RegistrationService } from 'src/submissions/registration/registration.service'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users() {
    return this.userService.findAll()
  }

  @Query(() => User)
  async user(
    @Args('userID', { type: () => Int })
    userID: User['id'],
  ): Promise<User> {
    return this.userService.findOne(userID)
  }

  /** Mutations */

  @Mutation(() => UserPayload)
  async userUpdate(
    @Args('userID', { type: () => Int }) userID: User['id'],
    @Args('userInput', { type: () => Int }) userInput: UserInput,
  ) {
    return this.userService.update(userID, userInput)
  }

  @Mutation(() => UserPayload)
  async userDelete(@Args('id', { type: () => Int }) id: User['id']) {
    return this.userService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField()
  async registrations(@Parent() user: User) {
    const { id }: { id: User['id'] } = user
    return this.registrationService.findAll(id)
  }
}
