import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GroupService } from './group.service'
import { CreateGroupInput } from './dto/create-group.input'
import { UpdateGroupInput } from './dto/update-group.input'

@Resolver('Group')
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation('createGroup')
  create(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput)
  }

  @Query('groups')
  findAll() {
    return this.groupService.findAll()
  }

  @Query('group')
  findOne(@Args('id') id: number) {
    return this.groupService.findOne(id)
  }

  @Mutation('updateGroup')
  update(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupService.update(updateGroupInput.id, updateGroupInput)
  }

  @Mutation('removeGroup')
  remove(@Args('id') id: number) {
    return this.groupService.remove(id)
  }
}
