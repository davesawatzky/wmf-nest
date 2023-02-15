import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PerformerService } from './performer.service'
import { PerformerInput } from 'src/graphql'
import { tbl_registration, tbl_reg_performer } from '@prisma/client'
// import { CreatePerformerInput } from './dto/create-performer.input'
// import { UpdatePerformerInput } from './dto/update-performer.input'

@Resolver('Performer')
export class PerformerResolver {
  constructor(private readonly performerService: PerformerService) {}

  /** Queries */

  @Query('performers')
  findAll() {
    return this.performerService.findAll()
  }

  @Query('performer')
  findOne(@Args('performerID') performerID: tbl_reg_performer['id']) {
    return this.performerService.findOne(performerID)
  }

  /** Mutations */

  @Mutation('performerCreate')
  create(
    @Args('registrationID') registrationID: tbl_registration['id'],
    @Args('performerInput') performerInput: Partial<PerformerInput>,
  ) {
    return this.performerService.create(registrationID, performerInput)
  }

  @Mutation('performerUpdate')
  update(
    @Args('performerID') performerID: tbl_reg_performer['id'],
    @Args('performerInput') performerInput: Partial<PerformerInput>,
  ) {
    return this.performerService.update(performerID, performerInput)
  }

  @Mutation('performerDelete')
  remove(@Args('id') id: number) {
    return this.performerService.remove(id)
  }
}
