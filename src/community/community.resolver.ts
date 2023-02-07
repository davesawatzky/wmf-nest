import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CommunityService } from './community.service'
import { CreateCommunityInput } from './dto/create-community.input'
import { UpdateCommunityInput } from './dto/update-community.input'

@Resolver('Community')
export class CommunityResolver {
  constructor(private readonly communityService: CommunityService) {}

  @Mutation('createCommunity')
  create(
    @Args('createCommunityInput') createCommunityInput: CreateCommunityInput,
  ) {
    return this.communityService.create(createCommunityInput)
  }

  @Query('community')
  findAll() {
    return this.communityService.findAll()
  }

  @Query('community')
  findOne(@Args('id') id: number) {
    return this.communityService.findOne(id)
  }

  @Mutation('updateCommunity')
  update(
    @Args('updateCommunityInput') updateCommunityInput: UpdateCommunityInput,
  ) {
    return this.communityService.update(
      updateCommunityInput.id,
      updateCommunityInput,
    )
  }

  @Mutation('removeCommunity')
  remove(@Args('id') id: number) {
    return this.communityService.remove(id)
  }
}
