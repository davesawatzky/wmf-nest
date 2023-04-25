import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'
import { IsDate, IsString } from 'class-validator'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime/library'
import { Type, Transform } from 'class-transformer'

@InputType()
export class SubmissionInput {
  @Field(() => GraphQLISODateTime)
  @IsDate()
  submittedAt: Date

  @IsString()
  submission: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(() => transformToDecimal)
  payedAmt?: Decimal
}
