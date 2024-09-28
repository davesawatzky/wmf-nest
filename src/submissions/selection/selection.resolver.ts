import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity'
import { UseGuards } from '@nestjs/common/decorators'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { tbl_reg_class } from '@prisma/client'
import { SelectionInput } from './dto/selection.input'
import { Selection, SelectionPayload } from './entities/selection.entity'
import { SelectionService } from './selection.service'

@Resolver(() => Selection)
@UseGuards(JwtAuthGuard)
export class SelectionResolver {
  constructor(private readonly selectionService: SelectionService) {}

  /** Queries */

  @Query(() => [Selection])
  async selections(
    @Args('registeredClassID', { type: () => Int, nullable: true })
    registeredClassID: RegisteredClass['id'] | null,
  ) {
    return await this.selectionService.findAll(registeredClassID)
  }

  @Query(() => Selection)
  async selection(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
  ) {
    return await this.selectionService.findOne(selectionID)
  }

  /** Mutations */

  @Mutation(() => SelectionPayload)
  async selectionCreate(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: tbl_reg_class['id'],
  ) {
    return await this.selectionService.create(registeredClassID)
  }

  @Mutation(() => SelectionPayload)
  async selectionUpdate(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
    @Args('selectionInput', { type: () => SelectionInput })
    selectionInput: Partial<SelectionInput>,
  ) {
    return await this.selectionService.update(selectionID, selectionInput)
  }

  @Mutation(() => SelectionPayload)
  async selectionDelete(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
  ) {
    return await this.selectionService.remove(selectionID)
  }
}
