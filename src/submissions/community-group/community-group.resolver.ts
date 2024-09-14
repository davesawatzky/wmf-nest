import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { CommunityService } from '@/submissions/community/community.service'
import { Community } from '@/submissions/community/entities/community.entity'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_reg_community, tbl_reg_communitygroup } from '@prisma/client'
import { CommunityGroupService } from './community-group.service'
import { CommunityGroupInput } from './dto/community-group.input'
import { CommunityGroup, CommunityGroupPayload } from './entities/community-group.entity'

@Resolver(() => CommunityGroup)
@UseGuards(JwtAuthGuard)
export class CommunityGroupResolver {
  constructor(
    private readonly communityGroupService: CommunityGroupService,
    private readonly communityService: CommunityService,
  ) {}

  /** Queries */

  @Query(() => [CommunityGroup])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: CommunityGroup })
  async communityGroups(
    @Args('communityID', { type: () => Int, nullable: true })
    communityID: tbl_reg_communitygroup['communityID'],
  ) {
    try {
      return await this.communityGroupService.findAll(communityID)
    }
    catch (error) {
      throw new HttpException('Community groups not found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => CommunityGroup)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: CommunityGroup })
  async communityGroup(
    @Args('communityGroupID', { type: () => Int })
    communityGroupID: tbl_reg_communitygroup['id'],
  ) {
    try {
      return await this.communityGroupService.findOne(communityGroupID)
    }
    catch (error) {
      throw new HttpException('Community group not found', HttpStatus.NOT_FOUND)
    }
  }

  /** Mutations */

  @Mutation(() => CommunityGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: CommunityGroup })
  async communityGroupCreate(
    @Args('communityID', { type: () => Int })
    communityID: tbl_reg_community['id'],
    @Args('communityGroupInput', { type: () => CommunityGroupInput, nullable: true })
    communityGroupInput: Partial<CommunityGroupInput>,
  ) {
    try {
      return await this.communityGroupService.create(communityID, communityGroupInput)
    }
    catch (error) {
      throw new HttpException('Cannot create community group', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Mutation(() => CommunityGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: CommunityGroup })
  async communityGroupUpdate(
    @Args('communityGroupID', { type: () => Int })
    communityGroupID: CommunityGroup['id'],
    @Args('communityGroupInput', { type: () => CommunityGroupInput })
    communityGroupInput: Partial<CommunityGroupInput>,
  ) {
    try {
      return await this.communityGroupService.update(communityGroupID, communityGroupInput)
    }
    catch (error) {
      throw new HttpException('Cannot update community group', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Mutation(() => CommunityGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: CommunityGroup })
  async communityGroupDelete(
    @Args('communityGroupID', { type: () => Int })
    communityGroupID: CommunityGroup['id'],
  ) {
    try {
      return await this.communityGroupService.remove(communityGroupID)
    }
    catch (error) {
      throw new HttpException('Cannot delete community group', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => Community)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Community })
  async community(@Parent() communityGroup: tbl_reg_communitygroup) {
    const communityID = communityGroup.communityID
    return await this.communityService.findOne(undefined, communityID)
  }
}
