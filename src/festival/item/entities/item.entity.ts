import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator'

import { UserError } from '@/common.entity.js'
import { OrderItem } from '@/submissions/order-item/entities/order-item.entity.js'
import { Order } from '@/submissions/order/entities/order.entity.js'

@ObjectType()
export class Item {
  @Field(() => Int)
  id: number

  name?: string

  @IsOptional()
  description?: string

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number

  @IsBoolean()
  taxable?: boolean

  @IsBoolean()
  transferable?: boolean

  @IsDate()
  startDate?: Date

  @IsDate()
  endDate?: Date

  notes?: string
  updatedAt?: Date
  createdAt?: Date

  orders?: Order[]
  orderItems?: OrderItem[]
}

@ObjectType()
export class ItemPayload {
  userErrors: UserError[]
  item?: Item
}
