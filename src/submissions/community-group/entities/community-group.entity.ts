import { UserError } from '@/common.entity'
import { Community } from '@/submissions/community/entities/community.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CommunityGroup {
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
  photoPermission?: boolean
  community?: Community
}

@ObjectType()
export class CommunityGroupPayload {
  userErrors: UserError[]
  communityGroup?: CommunityGroup
}
