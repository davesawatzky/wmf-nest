import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SelectionService } from './selection.service'
import { CreateSelectionInput } from './dto/create-selection.input'
import { UpdateSelectionInput } from './dto/update-selection.input'

@Resolver('Selection')
export class SelectionResolver {
  constructor(private readonly selectionService: SelectionService) {}

  @Mutation('createSelection')
  create(
    @Args('createSelectionInput') createSelectionInput: CreateSelectionInput,
  ) {
    return this.selectionService.create(createSelectionInput)
  }

  @Query('selection')
  findAll() {
    return this.selectionService.findAll()
  }

  @Query('selection')
  findOne(@Args('id') id: number) {
    return this.selectionService.findOne(id)
  }

  @Mutation('updateSelection')
  update(
    @Args('updateSelectionInput') updateSelectionInput: UpdateSelectionInput,
  ) {
    return this.selectionService.update(
      updateSelectionInput.id,
      updateSelectionInput,
    )
  }

  @Mutation('removeSelection')
  remove(@Args('id') id: number) {
    return this.selectionService.remove(id)
  }
}
