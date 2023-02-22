import { InputType, Field } from '@nestjs/graphql'
import { SGSlabel } from 'src/common.entity'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime'
import { Type, Transform } from 'class-transformer'

@InputType()
export class RegistrationInput {
  label?: string

  @Field(() => SGSlabel)
  performerType?: SGSlabel
  submittedAt?: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(() => transformToDecimal)
  totalAmt?: Decimal

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(() => transformToDecimal)
  payedAmt?: Decimal
  transactionInfo?: string
  confirmation?: string
}
