import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { PerformerService } from './performer.service'
import { PerformerInput } from './dto/performer.input'
import { PerformerPayload } from './entities/performer.entity'
import { tbl_registration } from '@prisma/client'
import { Performer } from './entities/performer.entity'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Resolver(() => Performer)
@UseGuards(JwtAuthGuard)
export class PerformerResolver {
  constructor(private readonly performerService: PerformerService) {}

  /** Queries */

  @Query(() => [Performer])
  async performers(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id']
  ) {
    return this.performerService.findAll(registrationID)
  }

  @Query(() => Performer)
  async performer(
    @Args('performerID', { type: () => Int })
    performerID: Performer['id']
  ) {
    return this.performerService.findOne(performerID)
  }

  /** Mutations */

  @Mutation(() => PerformerPayload)
  async performerCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('performerInput', { type: () => PerformerInput })
    performerInput: Partial<PerformerInput>
  ) {
    return this.performerService.create(registrationID, performerInput)
  }

  @Mutation(() => PerformerPayload)
  async performerUpdate(
    @Args('performerID', { type: () => Int }) performerID: Performer['id'],
    @Args('performerInput', { type: () => PerformerInput })
    performerInput: Partial<PerformerInput>
  ) {
    return this.performerService.update(performerID, performerInput)
  }

  @Mutation(() => PerformerPayload)
  async performerDelete(@Args('performerID', { type: () => Int }) performerID: Performer['id']) {
    return this.performerService.remove(performerID)
  }
}
