import { ObjectType, Field } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'

@ObjectType()
export class Submission {
  @Field(() => Date)
  submitted_at: Date
  submission: string
}

@ObjectType()
export class SubmissionPayload {
  userErrors: UserError[]
  submission?: Submission
}
