import { ObjectType, Field } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'
import { Prisma, tbl_registration } from '@prisma/client'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Submission {
  @Field(() => Date)
  submittedAt: Date
  submission: string

  @Field(() => GraphQLDecimal)
  payedAmt?: number
}

@ObjectType()
export class SubmissionPayload {
  userErrors?: UserError[]
  submission?: Submission
}
