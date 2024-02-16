import { InputType, Field, Int } from '@nestjs/graphql'
import { PerformerType } from '../../../common.entity'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { IsNumber, IsInt, IsString, IsOptional } from 'class-validator'

@InputType()
export class RegistrationInput {
  @IsString()
  @IsOptional()
  confirmation?: string

  @IsString()
  @IsOptional()
  label?: string

  @Field(() => PerformerType)
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
