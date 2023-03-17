import { InputType, Field } from '@nestjs/graphql'
import { SGSlabel } from 'src/common.entity'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime/library'
import { Type, Transform } from 'class-transformer'

@InputType()
export class RegistrationInput {
  label?: string

  @Field(() => SGSlabel)
  performerType?: SGSlabel

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(() => transformToDecimal)
  totalAmt?: Decimal
  transactionInfo?: string
}
