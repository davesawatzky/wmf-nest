import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CommunityService } from './community.service'
import { CommunityInput, Community, Registration } from 'src/graphql'
// import { CommunityInput } from './dto/create-community.input'
// import { UpdateCommunityInput } from './dto/update-community.input'

@Resolver('Community')
export class CommunityResolver {
  constructor(private readonly communityService: CommunityService) {}

  @Mutation('createCommunity')
  create(
    @Args('communityInput') communityInput: CommunityInput,
    @Args('registrationID') registrationID: Registration['id'],
  ) {
    return this.communityService.create(registrationID, communityInput)
  }

  @Query('communities')
  findAll() {
    return this.communityService.findAll()
  }

  @Query('community')
  findOne(@Args('id') id: number) {
    return this.communityService.findOne(id)
  }

  @Mutation('updateCommunity')
  update(
    @Args('communityID') communityID: Community['id'],
    @Args('community') community: CommunityInput,
  ) {
    return this.communityService.update(communityID, community)
  }

  @Mutation('removeCommunity')
  remove(@Args('id') id: number) {
    return this.communityService.remove(id)
  }
}
