import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'

@ObjectType()
export class Community {
  @Field(() => Int)
  id: number
  name?: string
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

@ObjectType()
export class CommunityPayload {
  userErrors: UserError[]
  community?: Community
}
