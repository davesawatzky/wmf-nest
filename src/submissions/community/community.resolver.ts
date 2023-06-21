import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CommunityService } from './community.service'
import { CommunityPayload } from './entities/community.entity'
import { CommunityInput } from './dto/community.input'
import { Community } from './entities/community.entity'
import { tbl_registration } from '@prisma/client'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

@Resolver(() => Community)
@UseGuards(JwtAuthGuard)
export class CommunityResolver {
  constructor(private readonly communityService: CommunityService) {}

  /** Queries */

  @Query(() => [Community])
  async communities() {
    return await this.communityService.findAll()
  }

  @Query(() => Community)
  async community(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id']
  ) {
    return await this.communityService.findOne(registrationID)
  }

  /** Mutations */

  @Mutation(() => CommunityPayload)
  async communityCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id']
  ) {
    return await this.communityService.create(registrationID)
  }

  @Mutation(() => CommunityPayload)
  async communityUpdate(
    @Args('communityID', { type: () => Int })
    communityID: Community['id'],
    @Args('communityInput', { type: () => CommunityInput })
    communityInput: Partial<CommunityInput>
  ) {
    return await this.communityService.update(communityID, communityInput)
  }

  @Mutation(() => CommunityPayload)
  async communityDelete(
    @Args('communityID', { type: () => Int })
    communityID: Community['id']
  ) {
    return await this.communityService.remove(communityID)
  }
}
