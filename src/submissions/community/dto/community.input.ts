import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CommunityInput {
  name: string
  conflictPerformers?: string

  @Field(() => Int)
  groupSize?: number

  @Field(() => Int)
  chaperones?: number

  @Field(() => Int)
  wheelchairs?: number
  earliestTime?: string
  latestTime?: string
  unavailable?: string
}
