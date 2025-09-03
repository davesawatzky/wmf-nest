import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'
import { UserError } from '@/common.entity'
import { Item } from '@/festival/item/entities/item.entity'
import { OrderItem } from '@/submissions/order-item/entities/order-item.entity'
import { User } from '@/user/entities/user.entity'

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  totalAmount?: number

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  payedAmount?: number

  purchaseDate?: Date
  deliveryDate?: Date
  methodDelivered?: string
  updatedAt?: Date
  createdAt?: Date

  user?: User
  items?: Item[]
  orderItems?: OrderItem[]
}
@ObjectType()
export class OrderPayload {
  userErrors: UserError[]
  order?: Order
}
