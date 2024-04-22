import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsOptional, IsString } from 'class-validator'
import { Decimal } from '@prisma/client/runtime/library'

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
