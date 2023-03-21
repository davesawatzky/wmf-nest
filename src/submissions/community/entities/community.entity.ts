import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'

@ObjectType()
export class Community {
  @Field(() => Int)
  id: number
  name: string
  conflict_performers?: string

  @Field(() => Int)
  group_size?: number

  @Field(() => Int)
  chaperones?: number

  @Field(() => Int)
  wheelchairs?: number
  earliest_time?: string
  latest_time?: string
  unavailable?: string
}

@ObjectType()
export class CommunityPayload {
  userErrors: UserError[]
  community?: Community
}
