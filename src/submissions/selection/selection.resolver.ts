import { BadRequestException, Logger } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { tbl_reg_class } from '@prisma/client'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity'
import { SelectionInput } from './dto/selection.input'
import { Selection, SelectionPayload } from './entities/selection.entity'
import { SelectionService } from './selection.service'

@Resolver(() => Selection)
@UseGuards(JwtAuthGuard)
export class SelectionResolver {
  private readonly logger = new Logger(SelectionResolver.name)

  constructor(private readonly selectionService: SelectionService) {}

  /** Queries */

  @Query(() => [Selection])
  async selections(
    @Args('registeredClassID', { type: () => Int, nullable: true })
    registeredClassID: RegisteredClass['id'] | null,
  ) {
    this.logger.log(`Fetching selections${registeredClassID ? ` for registered class ID: ${registeredClassID}` : ''}`)
    return await this.selectionService.findAll(registeredClassID)
  }

  @Query(() => Selection)
  async selection(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
  ) {
    this.logger.log(`Fetching selection ID: ${selectionID}`)
    return await this.selectionService.findOne(selectionID)
  }

  /** Mutations */

  @Mutation(() => SelectionPayload)
  async selectionCreate(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: tbl_reg_class['id'],
  ) {
    this.logger.log(`Creating selection for registered class ID: ${registeredClassID}`)
    return await this.selectionService.create(registeredClassID)
  }

  @Mutation(() => SelectionPayload)
  async selectionUpdate(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
    @Args('selectionInput', { type: () => SelectionInput })
    selectionInput: Partial<SelectionInput>,
  ) {
    this.logger.log(`Updating selection ID: ${selectionID}`)
    return await this.selectionService.update(selectionID, selectionInput)
  }

  @Mutation(() => SelectionPayload)
  async selectionDelete(
    @Args('selectionID', { type: () => Int })
    selectionID: Selection['id'],
  ) {
    this.logger.log(`Deleting selection ID: ${selectionID}`)
    return await this.selectionService.remove(selectionID)
  }
}
