import { Item } from '@/festival/items/entities/item.entity'
import { Order } from '@/submissions/orders/entities/order.entity'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class OrderItemInput {
  @Field(() => Int)
  orderID: Order['id']

  @Field(() => Int)
  itemID: Item['id']

  @IsOptional()
  nameOnItem?: string

  @IsOptional()
  notes?: string
}
