import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GroupService } from './group.service'
import { GroupInput } from 'src/graphql'
// import { CreateGroupInput } from './dto/create-group.input'
// import { UpdateGroupInput } from './dto/update-group.input'
import { tbl_registration, tbl_reg_group } from '@prisma/client'

@Resolver('Group')
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  /** Queries */

  @Query('groups')
  findAll() {
    return this.groupService.findAll()
  }

  @Query('group')
  findOne(@Args('groupID') groupID: tbl_reg_group['id']) {
    return this.groupService.findOne(groupID)
  }

  /** Mutations */

  @Mutation('groupCreate')
  create(
    @Args('registrationID') registrationID: tbl_registration['id'],
    @Args('groupInput') groupInput: Partial<GroupInput>,
  ) {
    return this.groupService.create(registrationID, groupInput)
  }

  @Mutation('groupUpdate')
  update(
    @Args('groupID') groupID: tbl_reg_group['id'],
    @Args('groupInput') groupInput: Partial<GroupInput>,
  ) {
    return this.groupService.update(groupID, groupInput)
  }

  @Mutation('groupDelete')
  remove(@Args('groupID') groupID: tbl_reg_group['id']) {
    return this.groupService.remove(groupID)
  }
}
