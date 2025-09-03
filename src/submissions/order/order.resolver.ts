import { UseGuards } from '@nestjs/common'
import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_order } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { User } from '@/user/entities/user.entity'
import { UserService } from '@/user/user.service'
import { OrderItem } from '../order-item/entities/order-item.entity'
import { OrderItemService } from '../order-item/order-item.service'
import { OrderInput } from './dto/order.input'
import { Order, OrderPayload } from './entities/order.entity'
import { OrderService } from './order.service'

@Resolver(() => Order)
@UseGuards(JwtAuthGuard)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly userService: UserService,
  ) {}

  // Queries
  @Query(() => [Order])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  async orders(@Context() context) {
    return await this.orderService.findAll(context.req.user.admin ? undefined : context.req.user.id)
  }

  @Query(() => Order)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  async order(
    @Context() context,
    @Args('orderID', { type: () => Int }) orderID: Order['id'],
  ) {
    return await this.orderService.findOne(context.req.user.admin ? undefined : context.req.user.id, orderID)
  }

  // Mutations
  @Mutation(() => OrderPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Order })
  async orderCreate(
    @Context() context,
    @Args('orderInput', { type: () => OrderInput }) orderInput: Partial<OrderInput>,
  ) {
    return await this.orderService.create(context.req.user.id, orderInput)
  }

  @Mutation(() => OrderPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Order })
  async orderUpdate(
    @Args('orderID', { type: () => Int }) orderID: Order['id'],
    @Args('orderInput', { type: () => OrderInput }) orderInput: Partial<OrderInput>,
  ) {
    return await this.orderService.update(orderID, orderInput)
  }

  @Mutation(() => OrderPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Order })
  async orderDelete(
    @Args('orderID', { type: () => Int }) orderID: Order['id'],
  ) {
    return await this.orderService.remove(orderID)
  }

  // Field Resolvers
  @ResolveField(() => User)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  async user(@Parent() order: tbl_order) {
    const { userID }: { userID: tbl_order['userID'] } = order
    return await this.userService.findOne(userID)
  }

  @ResolveField(() => [OrderItem])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: OrderItem })
  async orderItems(@Parent() order: tbl_order) {
    const { id: orderID }: { id: tbl_order['id'] } = order
    return await this.orderItemService.findAll(orderID)
  }
}
