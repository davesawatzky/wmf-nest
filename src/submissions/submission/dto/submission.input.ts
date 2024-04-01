import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'
import { IsDate, IsOptional, IsString } from 'class-validator'
import { Decimal } from '@prisma/client/runtime/library'
import { Type, Transform } from 'class-transformer'

@InputType()
export class SubmissionInput {
  @IsOptional()
  @IsDate()
  submittedAt: Date

  @IsString()
  @IsOptional()
  confirmation: string

  @IsOptional()
  @Field(() => Decimal)
  payedAmt?: Decimal
}
