import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PerformerService } from './performer.service'
import { CreatePerformerInput } from './dto/create-performer.input'
import { UpdatePerformerInput } from './dto/update-performer.input'

@Resolver('Performer')
export class PerformerResolver {
  constructor(private readonly performerService: PerformerService) {}

  @Mutation('createPerformer')
  create(
    @Args('createPerformerInput') createPerformerInput: CreatePerformerInput,
  ) {
    return this.performerService.create(createPerformerInput)
  }

  @Query('performer')
  findAll() {
    return this.performerService.findAll()
  }

  @Query('performer')
  findOne(@Args('id') id: number) {
    return this.performerService.findOne(id)
  }

  @Mutation('updatePerformer')
  update(
    @Args('updatePerformerInput') updatePerformerInput: UpdatePerformerInput,
  ) {
    return this.performerService.update(
      updatePerformerInput.id,
      updatePerformerInput,
    )
  }

  @Mutation('removePerformer')
  remove(@Args('id') id: number) {
    return this.performerService.remove(id)
  }
}
