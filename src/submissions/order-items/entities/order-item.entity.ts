import { Item } from '@/festival/items/entities/item.entity'
import { Order } from '@/submissions/orders/entities/order.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class OrderItem {
  @Field(() => Int)
  orderID: number

  @Field(() => Int)
  itemID: number

  nameOnItem?: string
  notes?: string
  updatedAt?: Date
  createdAt?: Date

  order?: Order
  item?: Item
}
