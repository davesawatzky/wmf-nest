import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CommunityService } from './community.service'
import { CommunityPayload } from './entities/community.entity'
import { CommunityInput } from './dto/community.input'
import { Community } from './entities/community.entity'
import { tbl_registration } from '@prisma/client'

@Resolver(() => Community)
export class CommunityResolver {
  constructor(private readonly communityService: CommunityService) {}

  /** Queries */

  @Query(() => [Community])
  async communities() {
    return this.communityService.findAll()
  }

  @Query(() => Community)
  async community(
    @Args('communityID', { type: () => Int })
    communityID: Community['id'],
  ) {
    return this.communityService.findOne(communityID)
  }

  /** Mutations */

  @Mutation(() => CommunityPayload)
  async communityCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('communityInput', { type: () => CommunityInput })
    communityInput: Partial<CommunityInput>,
  ) {
    return this.communityService.create(registrationID, communityInput)
  }

  @Mutation(() => CommunityPayload)
  async communityUpdate(
    @Args('communityID', { type: () => Int })
    communityID: Community['id'],
    @Args('communityInput', { type: () => CommunityInput })
    communityInput: Partial<CommunityInput>,
  ) {
    return this.communityService.update(communityID, communityInput)
  }

  @Mutation(() => CommunityPayload)
  async communityDelete(
    @Args('communityID', { type: () => Int })
    communityID: Community['id'],
  ) {
    return this.communityService.remove(communityID)
  }
}
