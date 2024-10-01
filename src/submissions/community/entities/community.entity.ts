import { UserError } from '@/common.entity'
import { CommunityGroup } from '@/submissions/community-group/entities/community-group.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Community {
  @Field(() => Int)
  id: number

  name?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
  email?: string
  communityGroups?: CommunityGroup[]
  registration?: Registration
}

@ObjectType()
export class CommunityPayload {
  userErrors: UserError[]
  community?: Community
}
