import { ForbiddenError } from '@casl/ability'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { NotFoundError } from 'rxjs'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Order } from '@/submissions/order/entities/order.entity'
import { OrderService } from '@/submissions/order/order.service'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { UserInput } from './dto/user.input'
import { User, UserPayload } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly registrationService: RegistrationService,
    private readonly orderService: OrderService,
  ) {}

  /** Queries */

  @Query(() => [User])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async users() {
    return await this.userService.findAll()
  }

  @Query(() => User)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  async myUser(@Context() context) {
    return await this.userService.findOne(context.req.user.id)
  }

  @Query(() => User || null)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async user(
    @Args('userID', { type: () => Int, nullable: true }) userID: User['id'],
    @Args('email', { type: () => String, nullable: true }) email: User['email'],
  ) {
    return await this.userService.findOne(userID, email)
  }

  /** Mutations */

  @Mutation(() => UserPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: User })
  async userUpdate(
    @Args('userID', { type: () => Int }) userID: User['id'],
    @Args('userInput', { type: () => UserInput }) userInput: Partial<UserInput>,
  ) {
    try {
      return await this.userService.update(userID, userInput)
    }
    catch (error: any) {
      if (error instanceof NotFoundError)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      else if (error instanceof ForbiddenError)
        throw new HttpException(error.message, HttpStatus.FORBIDDEN)
      else
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => UserPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  async userDelete(@Args('userID', { type: () => Int }) userID: User['id']) {
    return await this.userService.remove(userID)
  }

  /** Field Resolvers */

  @ResolveField(() => [Registration])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registrations(@Parent() user: User) {
    const { id }: { id: User['id'] } = user
    return await this.registrationService.findAll(id)
  }

  @ResolveField(() => [Order])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  async orders(@Parent() user: User) {
    const { id: userID }: { id: User['id'] } = user
    return await this.orderService.findAll(userID)
  }
}
