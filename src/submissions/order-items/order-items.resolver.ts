import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderItemInput } from './dto/order-item.input'
import { OrderItem } from './entities/order-item.entity'
import { OrderItemsService } from './order-items.service'

@Resolver(() => OrderItem)
export class OrderItemsResolver {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Mutation(() => OrderItem)
  createOrderItem(@Args('orderItemInput') orderItemInput: OrderItemInput) {
    return this.orderItemsService.create(orderItemInput)
  }

  @Query(() => [OrderItem], { name: 'orderItems' })
  findAll() {
    return this.orderItemsService.findAll()
  }

  @Query(() => OrderItem, { name: 'orderItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemsService.findOne(id)
  }

  @Mutation(() => OrderItem)
  updateOrderItem(@Args('orderItemInput') orderItemInput: OrderItemInput) {
    return this.orderItemsService.update(orderItemInput.id, orderItemInput)
  }

  @Mutation(() => OrderItem)
  removeOrderItem(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemsService.remove(id)
  }
}
