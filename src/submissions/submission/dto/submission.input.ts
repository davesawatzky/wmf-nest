import { Field, InputType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { IsDate, IsOptional, IsString } from 'class-validator'

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
