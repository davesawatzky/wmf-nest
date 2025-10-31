import { BadRequestException, Logger } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { tbl_reg_group, tbl_registration } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { GroupInput } from './dto/group.input'
import { Group, GroupPayload } from './entities/group.entity'
import { GroupService } from './group.service'

@Resolver(() => Group)
@UseGuards(JwtAuthGuard)
export class GroupResolver {
  private readonly logger = new Logger(GroupResolver.name)

  constructor(
    private readonly groupService: GroupService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query(() => [Group])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async groups(
    @Args('registrationID', { type: () => Int, nullable: true })
    registrationID: Registration['id'],
  ) {
    this.logger.log(`Fetching groups${registrationID ? ` for registration ID: ${registrationID}` : ' (admin query)'}`)
    return await this.groupService.findAll(registrationID)
  }

  @Query(() => Group)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Group })
  async group(
    @Args('registrationID', { type: () => Int, nullable: true })
    registrationID: tbl_registration['id'],
    @Args('groupID', { type: () => Int, nullable: true })
    groupID: Group['id'],
  ) {
    if (!registrationID && !groupID) {
      this.logger.error('group query failed - Either registrationID or groupID is required')
      throw new BadRequestException('Either registration ID or group ID is required')
    }

    this.logger.log(`Fetching group${registrationID ? ` for registration ID: ${registrationID}` : ` with ID: ${groupID}`}`)
    return await this.groupService.findOne(registrationID, groupID)
  }

  /** Mutations */

  @Mutation(() => GroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Group })
  async groupCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
  ) {
    if (!registrationID) {
      this.logger.error('groupCreate mutation failed - registrationID is required')
      throw new BadRequestException('Registration ID is required')
    }

    this.logger.log(`Creating group for registration ID: ${registrationID}`)
    return await this.groupService.create(registrationID)
  }

  @Mutation(() => GroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Group })
  async groupUpdate(
    @Args('groupID', { type: () => Int }) groupID: Group['id'],
    @Args('groupInput', { type: () => GroupInput })
    groupInput: Partial<GroupInput>,
  ) {
    if (!groupID) {
      this.logger.error('groupUpdate mutation failed - groupID is required')
      throw new BadRequestException('Group ID is required')
    }

    if (!groupInput || Object.keys(groupInput).length === 0) {
      this.logger.error('groupUpdate mutation failed - groupInput is required')
      throw new BadRequestException('Group input is required')
    }

    this.logger.log(`Updating group ID: ${groupID}`)
    return await this.groupService.update(groupID, groupInput)
  }

  @Mutation(() => GroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Group })
  async groupDelete(
    @Args('groupID', { type: () => Int }) groupID: Group['id'],
  ) {
    if (!groupID) {
      this.logger.error('groupDelete mutation failed - groupID is required')
      throw new BadRequestException('Group ID is required')
    }

    this.logger.log(`Deleting group ID: ${groupID}`)
    return await this.groupService.remove(groupID)
  }

  /**
   * Field Resolver
   */
  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() group: tbl_reg_group) {
    if (!group?.regID) {
      this.logger.error('registration field resolver failed - Invalid group or missing regID')
      throw new BadRequestException('Invalid group')
    }

    this.logger.debug(`Fetching registration for group ID: ${group.id}`)

    const regID = group.regID
    return await this.registrationService.findOne(regID)
  }
}
