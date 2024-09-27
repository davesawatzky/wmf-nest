import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Item } from '@/festival/item/entities/item.entity'
import { ItemService } from '@/festival/item/item.service'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_order_item } from '@prisma/client'
import { Order } from '../order/entities/order.entity'
import { OrderService } from '../order/order.service'
import { OrderItemInput } from './dto/order-item.input'
import { OrderItem, OrderItemPayload } from './entities/order-item.entity'
import { OrderItemService } from './order-item.service'

@Resolver(() => OrderItem)
@UseGuards(JwtAuthGuard)
export class OrderItemResolver {
  constructor(
    private readonly orderItemsService: OrderItemService,
    private readonly orderService: OrderService,
    private readonly itemService: ItemService,
  ) {}

  @Query(() => [OrderItem])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: OrderItem })
  async orderItems(
    @Args('orderID', { type: () => Int }) orderID: Order['id'],
  ) {
    return await this.orderItemsService.findAll(orderID)
  }

  @Query(() => OrderItem)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: OrderItem })
  async orderItem(
    @Args('orderID', { type: () => Int }) orderID: OrderItem['orderID'],
    @Args('itemID', { type: () => Int }) itemID: OrderItem['itemID'],
  ) {
    return await this.orderItemsService.findOne(orderID, itemID)
  }

  @Mutation(() => OrderItemPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: OrderItem })
  async orderItemCreate(
    @Args('orderID', { type: () => Int }) orderID: Order['id'],
    @Args('orderItemInput', { type: () => OrderItemInput }) orderItemInput: OrderItemInput,
  ) {
    return await this.orderItemsService.create(orderID, orderItemInput)
  }

  @Mutation(() => OrderItemPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: OrderItem })
  async orderItemUpdate(
    @Args('orderID', { type: () => Int }) orderID: OrderItem['orderID'],
    @Args('itemID', { type: () => Int }) itemID: OrderItem['itemID'],
    @Args('orderItemInput') orderItemInput: OrderItemInput,
  ) {
    return await this.orderItemsService.update(orderID, itemID, orderItemInput)
  }

  @Mutation(() => OrderItemPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: OrderItem })
  orderItemDelete(
    @Args('orderID', { type: () => Int }) orderID: OrderItem['orderID'],
    @Args('itemID', { type: () => Int }) itemID: OrderItem['itemID'],
  ) {
    return this.orderItemsService.remove(orderID, itemID)
  }

  // Field Resolvers
  @ResolveField(() => Order)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Order })
  async order(@Parent() orderItem: tbl_order_item) {
    const { orderID } = orderItem
    return await this.orderService.findOne(orderID)
  }

  @ResolveField(() => Item)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Item })
  async item(@Parent() orderItem: tbl_order_item) {
    const { itemID } = orderItem
    return await this.itemService.findOne(itemID)
  }
}
