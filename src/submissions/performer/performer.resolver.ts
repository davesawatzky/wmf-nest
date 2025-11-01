import { BadRequestException, Logger } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { tbl_reg_performer, tbl_registration } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { SelectionService } from '../selection/selection.service'
import { PerformerInput } from './dto/performer.input'
import { Performer, PerformerPayload } from './entities/performer.entity'
import { PerformerService } from './performer.service'

@Resolver(() => Performer)
@UseGuards(JwtAuthGuard)
export class PerformerResolver {
  private readonly logger = new Logger(PerformerResolver.name)

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
    const isAdmin = context.req.user?.roles?.includes('admin')
    this.logger.log(`Fetching performers${isAdmin ? ' (admin query)' : registrationID ? ` for registration ID: ${registrationID}` : ''}`)

    return await this.performerService.findAll(
      isAdmin ? undefined : registrationID,
    )
  }

  @Query(() => Performer)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Performer })
  async performer(
    @Args('performerID', { type: () => Int })
    performerID: Performer['id'],
  ) {
    if (!performerID) {
      this.logger.error('performer query failed - performerID is required')
      // throw new BadRequestException('Performer ID is required')
    }

    this.logger.log(`Fetching performer ID: ${performerID}`)
    return await this.performerService.findOne(performerID)
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
    if (!registrationID) {
      this.logger.error('performerCreate mutation failed - registrationID is required')
      // throw new BadRequestException('Registration ID is required')
    }

    this.logger.log(`Creating performer for registration ID: ${registrationID}`)
    return await this.performerService.create(registrationID, performerInput)
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
    if (!performerID) {
      this.logger.error('performerUpdate mutation failed - performerID is required')
      // throw new BadRequestException('Performer ID is required')
    }

    if (!performerInput || Object.keys(performerInput).length === 0) {
      this.logger.error('performerUpdate mutation failed - performerInput is required')
      // throw new BadRequestException('Performer input is required')
    }

    this.logger.log(`Updating performer ID: ${performerID}`)
    return await this.performerService.update(performerID, performerInput)
  }

  @Mutation(() => PerformerPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Performer })
  async performerDelete(
    @Args('performerID', { type: () => Int })
    performerID: Performer['id'],
  ) {
    if (!performerID) {
      this.logger.error('performerDelete mutation failed - performerID is required')
      // throw new BadRequestException('Performer ID is required')
    }

    this.logger.log(`Deleting performer ID: ${performerID}`)
    return await this.performerService.remove(performerID)
  }

  /**
   * Field Resolver
   */
  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() performer: tbl_reg_performer) {
    if (!performer?.regID) {
      this.logger.error('registration field resolver failed - Invalid performer or missing regID')
      // throw new BadRequestException('Invalid performer')
    }

    this.logger.debug(`Fetching registration for performer ID: ${performer.id}`)

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
