import { InputType, Field, Int } from '@nestjs/graphql'
import { PerformerType } from '../../../common.entity'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@InputType()
export class RegistrationInput {
  confirmation?: string
  label?: string

  @Field(() => PerformerType)
  performerType?: PerformerType

  @Field(() => GraphQLDecimal)
  payedAmt?: number

  @Field(() => Int)
  teacherID?: number

  @Field(() => GraphQLDecimal)
  totalAmt?: number
  transactionInfo?: string
  submittedAt?: Date
}
