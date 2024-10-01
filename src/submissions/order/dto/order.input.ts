import { OrderItemInput } from '@/submissions/order-item/dto/order-item.input'
import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class OrderInput {
  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalAmount?: number

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  payedAmount?: number

  @IsDate()
  @IsOptional()
  purchaseDate?: Date

  @IsDate()
  @IsOptional()
  deliveryDate?: Date

  @IsOptional()
  @IsString()
  methodDelivered?: string
}
