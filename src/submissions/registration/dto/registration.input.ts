import { InputType, Field, Int } from '@nestjs/graphql'
import { PerformerType } from '../../../common.entity'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { IsNumber, IsInt } from 'class-validator'

@InputType()
export class RegistrationInput {
  confirmation?: string
  label?: string

  @Field(() => PerformerType)
  performerType?: PerformerType

  @IsNumber()
  @Field(() => GraphQLDecimal)
  payedAmt?: number

  @IsInt()
  @Field(() => Int)
  teacherID?: number

  @IsNumber()
  @Field(() => GraphQLDecimal)
  totalAmt?: number
  transactionInfo?: string
  submittedAt?: Date
}
