import { PerformerType } from '@/common.entity'
import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class RegistrationInput {
  @IsString()
  @IsOptional()
  confirmation?: string

  @IsString()
  @IsOptional()
  label?: string

  @IsOptional()
  performerType?: PerformerType

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  payedAmt?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  teacherID?: number

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  photoPermission?: boolean

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalAmt?: number

  @IsString()
  @IsOptional()
  transactionInfo?: string

  @IsOptional()
  submittedAt?: Date
}
