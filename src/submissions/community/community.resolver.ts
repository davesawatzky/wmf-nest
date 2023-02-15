import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CommunityService } from './community.service'
import { CommunityInput, Community, Registration } from 'src/graphql'
import { tbl_registration, tbl_reg_community } from '@prisma/client'
// import { CommunityInput } from './dto/create-community.input'
// import { UpdateCommunityInput } from './dto/update-community.input'

@Resolver('Community')
export class CommunityResolver {
  constructor(private readonly communityService: CommunityService) {}

  /** Queries */

  @Query('communities')
  findAll() {
    return this.communityService.findAll()
  }

  @Query('community')
  findOne(@Args('communityID') communityID: tbl_reg_community['id']) {
    return this.communityService.findOne(communityID)
  }

  /** Mutations */

  @Mutation('communityCreate')
  create(
    @Args('registrationID') registrationID: tbl_registration['id'],
    @Args('communityInput') communityInput: Partial<CommunityInput>,
  ) {
    return this.communityService.create(registrationID, communityInput)
  }

  @Mutation('communityUpdate')
  update(
    @Args('communityID') communityID: tbl_reg_community['id'],
    @Args('communityInput') communityInput: Partial<CommunityInput>,
  ) {
    return this.communityService.update(communityID, communityInput)
  }

  @Mutation('communityDelete')
  remove(@Args('communityID') communityID: tbl_reg_community['id']) {
    return this.communityService.remove(communityID)
  }
}
