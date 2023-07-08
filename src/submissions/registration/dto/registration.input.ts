import { InputType, Field } from '@nestjs/graphql'
import { PerformerType } from '../../../common.entity'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'

@InputType()
export class RegistrationInput {
  confirmation?: string
  label?: string

  @Field(() => PerformerType)
  performerType: PerformerType

  @Field(() => GraphQLDecimal)
  payedAmt?: number

  @Field(() => GraphQLDecimal)
  totalAmt?: number
  transactionInfo?: string
  submittedAt?: Date
}
