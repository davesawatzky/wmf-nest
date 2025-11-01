import { BadRequestException, Logger, UseGuards } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { tbl_reg_community, tbl_reg_communitygroup } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { CommunityService } from '@/submissions/community/community.service'
import { Community } from '@/submissions/community/entities/community.entity'
import { CommunityGroupService } from './community-group.service'
import { CommunityGroupInput } from './dto/community-group.input'
import {
  CommunityGroup,
  CommunityGroupPayload,
} from './entities/community-group.entity'

@Resolver(() => CommunityGroup)
@UseGuards(JwtAuthGuard)
export class CommunityGroupResolver {
  private readonly logger = new Logger(CommunityGroupResolver.name)

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
    this.logger.log(`Fetching community groups${communityID ? ` for community ID: ${communityID}` : ''}`)
    return await this.communityGroupService.findAll(communityID)
  }

  @Query(() => CommunityGroup)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: CommunityGroup })
  async communityGroup(
    @Args('communityGroupID', { type: () => Int })
    communityGroupID: tbl_reg_communitygroup['id'],
  ) {
    this.logger.log(`Fetching community group ID: ${communityGroupID}`)
    return await this.communityGroupService.findOne(communityGroupID)
  }

  /** Mutations */

  @Mutation(() => CommunityGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: CommunityGroup })
  async communityGroupCreate(
    @Args('communityID', { type: () => Int })
    communityID: tbl_reg_community['id'],
    @Args('communityGroupInput', {
      type: () => CommunityGroupInput,
      nullable: true,
    })
    communityGroupInput: Partial<CommunityGroupInput>,
  ) {
    this.logger.log(`Creating community group for community ID: ${communityID}`)
    return await this.communityGroupService.create(
      communityID,
      communityGroupInput,
    )
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
    this.logger.log(`Updating community group ID: ${communityGroupID}`)
    return await this.communityGroupService.update(
      communityGroupID,
      communityGroupInput,
    )
  }

  @Mutation(() => CommunityGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: CommunityGroup })
  async communityGroupDelete(
    @Args('communityGroupID', { type: () => Int })
    communityGroupID: CommunityGroup['id'],
  ) {
    this.logger.log(`Deleting community group ID: ${communityGroupID}`)
    return await this.communityGroupService.remove(communityGroupID)
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => Community)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Community })
  async community(@Parent() communityGroup: tbl_reg_communitygroup) {
    if (!communityGroup?.communityID) {
      this.logger.error('community field resolver failed - Invalid communityGroup or missing communityID')
      return null
    }
    this.logger.debug(`Fetching community for community group ID: ${communityGroup.id}`)
    const communityID = communityGroup.communityID
    return await this.communityService.findOne(null, communityID)
  }
}
