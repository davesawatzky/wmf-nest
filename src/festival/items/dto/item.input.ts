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
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number

  @IsOptional()
  @IsBoolean()
  taxable?: boolean

  @IsOptional()
  @IsBoolean()
  transferable?: boolean

  @IsOptional()
  @IsDate()
  starDate?: Date

  @IsOptional()
  @IsDate()
  endDate?: Date

  @IsOptional()
  @IsString()
  notes?: string
}
