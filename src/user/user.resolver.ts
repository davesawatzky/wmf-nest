import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
  Int,
  Context,
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { User, UserPayload } from './entities/user.entity'
import { UserInput } from './dto/user.input'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { ForbiddenException, HttpException, HttpStatus, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AbilityFactory, Action } from '../ability/ability.factory'
import { ForbiddenError } from '@casl/ability'
import { CheckAbilities } from '../ability/abilities.decorator'
import { AbilitiesGuard } from '../ability/abilities.guard'
import {NotFoundError} from 'rxjs'

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
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Users, subject: User })
  async users() {
    const username = { id: 1, isAdmin: false }
    const ability = this.abilityFactory.defineAbility(username)
    const isAllowed = ability.can(Action.Users, username)
    if (!isAllowed) {
      throw new ForbiddenException('only admin!!')
    }
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Users, username)
    return await this.userService.findAll()
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  @Query(() => User)
  async myUser(@Context() context) {
    return await this.userService.findOne(context.req.user.id)
  }

  @Query(() => User || null)
  async user(
    @Args('userID', {type: () => Int, nullable: true}) userID: User['id'],
    @Args('email', {type: () => String, nullable: true}) email: User['email'])
   {
    return await this.userService.findOne(userID, email)
  }

  /** Mutations */

  @Mutation(() => UserPayload)
  async userUpdate(
    @Args('userID', { type: () => Int }) userID: User['id'],
    @Args('userInput', { type: () => UserInput }) userInput: Partial<UserInput>
  ) {
    try {
      return await this.userService.update(userID, userInput)
    } catch (error:any) {
      if (error instanceof NotFoundError) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      } else if (error instanceof ForbiddenError) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN)
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Mutation(() => UserPayload)
  async userDelete(@Args('id', { type: () => Int }) id: User['id']) {
    return await this.userService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField(() => [Registration])
  async registrations(@Parent() user: User) {
    const { id }: { id: User['id'] } = user
    return await this.registrationService.findAll(id)
  }
}
