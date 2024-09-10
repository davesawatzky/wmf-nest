import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { CommunityGroupService } from '@/submissions/community-group/community-group.service'
import { CommunityGroup } from '@/submissions/community-group/entities/community-group.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_reg_community, tbl_registration } from '@prisma/client'
import { CommunityService } from './community.service'
import { CommunityInput } from './dto/community.input'
import { Community, CommunityPayload } from './entities/community.entity'

@Resolver(() => Community)
@UseGuards(JwtAuthGuard)
export class CommunityResolver {
  constructor(
    private readonly communityService: CommunityService,
    private readonly communityGroupService: CommunityGroupService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query(() => [Community])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async communities() {
    try {
      return await this.communityService.findAll()
    }
    catch (error) {
      throw new HttpException('No communities found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => Community)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Community })
  async community(
    @Args('registrationID', { type: () => Int, nullable: true })
    registrationID: tbl_registration['id'],
    @Args('communityID', { type: () => Int, nullable: true })
    communityID: Community['id'],
  ) {
    try {
      return await this.communityService.findOne(registrationID, communityID)
    }
    catch (error) {
      throw new HttpException('Community not found', HttpStatus.NOT_FOUND)
    }
  }

  /** Mutations */

  @Mutation(() => CommunityPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Community })
  async communityCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('communityInput', { type: () => CommunityInput, nullable: true })
    communityInput: Partial<CommunityInput>,
  ) {
    try {
      return await this.communityService.create(registrationID, communityInput)
    }
    catch (error) {
      throw new HttpException('Cannot create community', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Mutation(() => CommunityPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Community })
  async communityUpdate(
    @Args('communityID', { type: () => Int })
    communityID: Community['id'],
    @Args('communityInput', { type: () => CommunityInput })
    communityInput: Partial<CommunityInput>,
  ) {
    try {
      return await this.communityService.update(communityID, communityInput)
    }
    catch (error) {
      throw new HttpException('Cannot update community', HttpStatus.NOT_MODIFIED)
    }
  }

  @Mutation(() => CommunityPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Community })
  async communityDelete(
    @Args('communityID', { type: () => Int })
    communityID: Community['id'],
  ) {
    try {
      return await this.communityService.remove(communityID)
    }
    catch (error) {
      throw new HttpException('Cannot delete community', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   *  Field Resolver
   */

  @ResolveField(() => [CommunityGroup])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: CommunityGroup })
  async communityGroups(@Parent() community: tbl_reg_community) {
    const { id }: { id: Community['id'] } = community
    const communityID = id
    return await this.communityGroupService.findAll(communityID)
  }

  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() community: tbl_reg_community) {
    const regID = community.regID
    return await this.registrationService.findOne(regID)
  }
}
