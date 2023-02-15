import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SelectionService } from './selection.service'
import { SelectionInput } from 'src/graphql'
import { tbl_reg_classes, tbl_reg_selection } from '@prisma/client'
// import { CreateSelectionInput } from './dto/create-selection.input'
// import { UpdateSelectionInput } from './dto/update-selection.input'

@Resolver('Selection')
export class SelectionResolver {
  constructor(private readonly selectionService: SelectionService) {}

  /** Queries */

  @Query('selections')
  findAll() {
    return this.selectionService.findAll()
  }

  @Query('selection')
  findOne(@Args('selectionID') selectionID: tbl_reg_selection['id']) {
    return this.selectionService.findOne(selectionID)
  }

  /** Mutations */

  @Mutation('selectionCreate')
  create(
    @Args('registeredClassID') registeredClassID: tbl_reg_classes['id'],
    @Args('selectionInput') selectionInput: Partial<SelectionInput>,
  ) {
    return this.selectionService.create(registeredClassID, selectionInput)
  }

  @Mutation('selectionUpdate')
  update(
    @Args('selectionID') selectionID: tbl_reg_selection['id'],
    @Args('selectionInput') selectionInput: Partial<SelectionInput>,
  ) {
    return this.selectionService.update(selectionID, selectionInput)
  }

  @Mutation('selectionDelete')
  remove(@Args('selectionID') selectionID: tbl_reg_selection['id']) {
    return this.selectionService.remove(selectionID)
  }
}
