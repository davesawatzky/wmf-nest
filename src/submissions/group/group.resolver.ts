import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { GroupService } from './group.service'
import { GroupPayload } from './entities/group.entity'
import { GroupInput } from './dto/group.input'
import { Group } from './entities/group.entity'
import { tbl_registration } from '@prisma/client'

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  /** Queries */

  @Query(() => [Group])
  async groups() {
    return this.groupService.findAll()
  }

  @Query(() => Group)
  async group(@Args('groupID', { type: () => Int }) groupID: Group['id']) {
    return this.groupService.findOne(groupID)
  }

  /** Mutations */

  @Mutation(() => GroupPayload)
  create(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('groupInput', { type: () => GroupInput })
    groupInput: Partial<GroupInput>,
  ) {
    return this.groupService.create(registrationID, groupInput)
  }

  @Mutation(() => GroupPayload)
  async groupUpdate(
    @Args('groupID', { type: () => Int }) groupID: Group['id'],
    @Args('groupInput', { type: () => GroupInput })
    groupInput: Partial<GroupInput>,
  ) {
    return this.groupService.update(groupID, groupInput)
  }

  @Mutation(() => GroupPayload)
  async groupDelete(
    @Args('groupID', { type: () => Int }) groupID: Group['id'],
  ) {
    return this.groupService.remove(groupID)
  }
}
