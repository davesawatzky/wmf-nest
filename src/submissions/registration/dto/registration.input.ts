import { Field, InputType, Int } from '@nestjs/graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { PerformerType } from '@/common.entity'

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

  @IsNumber()
  @IsOptional()
  @Field(() => GraphQLDecimal)
  payedAmt?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  teacherID?: number

  @IsNumber()
  @IsOptional()
  @Field(() => GraphQLDecimal)
  totalAmt?: number

  @IsString()
  @IsOptional()
  transactionInfo?: string

  @IsOptional()
  submittedAt?: Date
}
