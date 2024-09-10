import { UserError } from '@/common.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Submission {
  @Field(() => Date)
  submittedAt: Date

  confirmation: string

  @Field(() => GraphQLDecimal)
  payedAmt?: number
}

@ObjectType()
export class SubmissionPayload {
  userErrors: UserError[]
  submission: Submission
}
