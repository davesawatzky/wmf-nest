import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class ItemInput {
  @IsString()
  @IsOptional()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number

  @IsBoolean()
  taxable?: boolean

  @IsBoolean()
  transferable?: boolean

  @IsDate()
  starDate?: Date

  @IsDate()
  endDate?: Date

  @IsString()
  notes?: string
}
