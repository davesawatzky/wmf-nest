import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_reg_community, tbl_registration } from '@prisma/client'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { CommunityService } from './community.service'
import { Community, CommunityPayload } from './entities/community.entity'
import { CommunityInput } from './dto/community.input'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { Action } from '@/ability/ability.factory'

@Resolver(() => Community)
@UseGuards(JwtAuthGuard)
export class CommunityResolver {
  constructor(
    private readonly communityService: CommunityService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query(() => [Community])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async communities(
    @Args('registrationID', { type: () => Int, nullable: true })
    registrationID: Registration['id'],
  ) {
    try {
      return await this.communityService.findAll(registrationID)
    }
    catch (error) {
      throw new HttpException('Communities not found', HttpStatus.NOT_FOUND)
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
  ) {
    try {
      return await this.communityService.create(registrationID)
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
  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() community: tbl_reg_community) {
    const regID = community.regID
    return await this.registrationService.findOne(regID)
  }
}
