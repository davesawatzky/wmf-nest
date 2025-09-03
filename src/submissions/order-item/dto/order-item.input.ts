import { Field, InputType, Int } from '@nestjs/graphql'
import { IsArray, IsOptional } from 'class-validator'
import { Item } from '@/festival/item/entities/item.entity'
import { Order } from '@/submissions/order/entities/order.entity'

@InputType()
export class OrderItemInput {
  @Field(() => Int)
  orderID: Order['id']

  @Field(() => Int)
  itemID: Item['id']

  @Field(() => [String])
  @IsOptional()
  @IsArray()
  namesOnItems?: string[]

  @Field(() => Int)
  @IsOptional()
  quantity?: number

  @IsOptional()
  notes?: string
}
