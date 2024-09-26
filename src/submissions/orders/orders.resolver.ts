import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderInput } from './dto/order.input'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('orderInput') orderInput: OrderInput) {
    return this.ordersService.create(orderInput)
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll()
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOne(id)
  }

  @Mutation(() => Order)
  updateOrder(@Args('orderInput') orderInput: OrderInput) {
    return this.ordersService.update(orderInput.id, orderInput)
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.remove(id)
  }
}
