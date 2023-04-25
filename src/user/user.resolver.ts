import { Resolver, ResolveField, Parent, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User, UserPayload } from './entities/user.entity'
import { UserInput } from './dto/user.input'
import { RegistrationService } from '../submissions/registration/registration.service'
import { ForbiddenException, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { TrimPipe } from 'src/pipes/trim.pipe'
import { AbilityFactory, Action } from 'src/ability/ability.factory'
import { ForbiddenError } from '@casl/ability'
import { CheckAbilities } from 'src/ability/abilities.decorator'
import { AbilitiesGuard } from 'src/ability/abilities.guard'

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly registrationService: RegistrationService,
    private abilityFactory: AbilityFactory
  ) {}

  /** Queries */

  @Query(() => [User])
  // @UseGuards(AbilitiesGuard)
  // @CheckAbilities({ action: Action.Users, subject: User })
  async users() {
    // const username = { id: 1, isAdmin: false }
    // const ability = this.abilityFactory.defineAbility(username)
    // const isAllowed = ability.can(Action.Users, username)
    // if (!isAllowed) {
    //   throw new ForbiddenException('only admin!!')
    // }
    // try {
    //   ForbiddenError.from(ability).throwUnlessCan(Action.Users, username)
    return this.userService.findAll()
    // } catch (error) {
    //   if (error instanceof ForbiddenError) {
    //     throw new ForbiddenException(error.message)
    //   }
    // }
  }

  @Query(() => User)
  async user(
    @Args('userID', { type: () => Int })
    userID: User['id']
  ): Promise<User> {
    return this.userService.findOne(userID)
  }

  /** Mutations */

  @Mutation(() => UserPayload)
  @UsePipes(TrimPipe)
  async userUpdate(
    @Args('userID', { type: () => Int }) userID: User['id'],
    @Args('userInput', { type: () => Int }) userInput: UserInput
  ) {
    return this.userService.update(userID, userInput)
  }

  @Mutation(() => UserPayload)
  @UsePipes(TrimPipe)
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
