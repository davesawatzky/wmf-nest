import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity.js'
import { Item } from '@/festival/item/entities/item.entity.js'
import { Order } from '@/submissions/order/entities/order.entity.js'

@ObjectType()
export class OrderItem {
  @Field(() => Int)
  orderID: number

  @Field(() => Int)
  itemID: number

  @Field(() => [String])
  namesOnItems: string[]

  @Field(() => Int)
  quantity: number

  notes?: string
  updatedAt?: Date
  createdAt?: Date

  order?: Order
  item?: Item
}

@ObjectType()
export class OrderItemPayload {
  userErrors: UserError[]
  orderItem?: OrderItem
}
