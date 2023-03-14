import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { SelectionService } from './selection.service'
import { Selection, SelectionPayload } from './entities/selection.entity'
import { SelectionInput } from './dto/selection.input'
import { tbl_reg_classes } from '@prisma/client'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Resolver(() => Selection)
@UseGuards(JwtAuthGuard)
export class SelectionResolver {
  constructor(private readonly selectionService: SelectionService) {}

  /** Queries */

  @Query(() => [Selection])
  async selections() {
    return this.selectionService.findAll()
  }

  @Query(() => Selection)
  async selection(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
  ) {
    return this.selectionService.findOne(selectionID)
  }

  /** Mutations */

  @Mutation(() => SelectionPayload)
  async selectionCreate(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: tbl_reg_classes['id'],
    @Args('selectionInput', { type: () => SelectionInput })
    selectionInput: Partial<SelectionInput>,
  ) {
    return this.selectionService.create(registeredClassID, selectionInput)
  }

  @Mutation(() => SelectionPayload)
  async selectionUpdate(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
    @Args('selectionInput', { type: () => SelectionInput })
    selectionInput: Partial<SelectionInput>,
  ) {
    return this.selectionService.update(selectionID, selectionInput)
  }

  @Mutation(() => SelectionPayload)
  async selectionDelete(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
  ) {
    return this.selectionService.remove(selectionID)
  }
}
