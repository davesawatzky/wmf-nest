import { HttpException, HttpStatus } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
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
    return await this.groupService.update(groupID, groupInput)
  }

  @Mutation(() => GroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Group })
  async groupDelete(
    @Args('groupID', { type: () => Int }) groupID: Group['id'],
  ) {
    return await this.groupService.remove(groupID)
  }

  /**
   * Field Resolver
   */
  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() group: tbl_reg_group) {
    const regID = group.regID
    return await this.registrationService.findOne(regID)
  }
}
