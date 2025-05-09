import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { HttpException, HttpStatus } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_reg_performer, tbl_registration } from '@prisma/client'
import { Selection } from '../selection/entities/selection.entity'
import {SelectionService} from '../selection/selection.service'
import { PerformerInput } from './dto/performer.input'
import { Performer, PerformerPayload } from './entities/performer.entity'
import {PerformerService} from './performer.service'

@Resolver(() => Performer)
@UseGuards(JwtAuthGuard)
export class PerformerResolver {
  constructor(
    private readonly performerService: PerformerService,
    private readonly registrationService: RegistrationService,
    private readonly selectionService: SelectionService,
  ) {}

  /** Queries */

  @Query(() => [Performer])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Performer })
  async performers(
    @Context() context,
    @Args('registrationID', { type: () => Int, nullable: true })
    registrationID: tbl_registration['id'],
  ) {
    try {
      return await this.performerService.findAll(
        context.req.user.admin ? undefined : registrationID,
      )
    }
    catch (error) {
      console.error(error)
      throw new HttpException('Performers not found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => Performer)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Performer })
  async performer(
    @Args('performerID', { type: () => Int })
    performerID: Performer['id'],
  ) {
    try {
      return await this.performerService.findOne(performerID)
    }
    catch (error) {
      throw new HttpException('Performer not found', HttpStatus.NOT_FOUND)
    }
  }

  /** Mutations */

  @Mutation(() => PerformerPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Performer })
  async performerCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('performerInput', { type: () => PerformerInput, nullable: true })
    performerInput: Partial<PerformerInput>,
  ) {
    try {
      return await this.performerService.create(registrationID, performerInput)
    }
    catch (error) {
      throw new HttpException('Cannot create performer', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Mutation(() => PerformerPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Performer })
  async performerUpdate(
    @Args('performerID', { type: () => Int })
    performerID: Performer['id'],
    @Args('performerInput', { type: () => PerformerInput })
    performerInput: Partial<PerformerInput>,
  ) {
    try {
      return await this.performerService.update(performerID, performerInput)
    }
    catch (error) {
      throw new HttpException('Cannot update performer', HttpStatus.NOT_MODIFIED)
    }
  }

  @Mutation(() => PerformerPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Performer })
  async performerDelete(
    @Args('performerID', { type: () => Int })
    performerID: Performer['id'],
  ) {
    try {
      return await this.performerService.remove(performerID)
    }
    catch (error) {
      throw new HttpException('Cannot delete performer', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Field Resolver
   */
  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() performer: tbl_reg_performer) {
    const regID = performer.regID
    return await this.registrationService.findOne(regID)
  }

  // @ResolveField(() => [Selection])
  // @UseGuards(AbilitiesGuard)
  // // @CheckAbilities({action: Action.Read, subject: Selection})
  // async selections(@Parent() performer: tbl_reg_performer) {
  //   const {regID}: {regID: tbl_reg_performer['regID']} = performer
  //   return await this.selectionService.findAll(regID)
  // }
}
