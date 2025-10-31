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
import { tbl_reg_community, tbl_registration } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { CommunityGroupService } from '@/submissions/community-group/community-group.service'
import { CommunityGroup } from '@/submissions/community-group/entities/community-group.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { CommunityService } from './community.service'
import { CommunityInput } from './dto/community.input'
import { Community, CommunityPayload } from './entities/community.entity'

@Resolver(() => Community)
@UseGuards(JwtAuthGuard)
export class CommunityResolver {
  private readonly logger = new Logger(CommunityResolver.name)

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
    this.logger.log('Fetching all communities (admin only)')
    return await this.communityService.findAll()
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
    if (!registrationID && !communityID) {
      this.logger.error('community query failed - Either registrationID or communityID must be provided')
      throw new BadRequestException('Either registration ID or community ID must be provided')
    }

    this.logger.log(
      `Fetching community${registrationID ? ` by registration ID: ${registrationID}` : ` by community ID: ${communityID}`}`,
    )
    return await this.communityService.findOne(registrationID, communityID)
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
    if (!registrationID) {
      this.logger.error('communityCreate mutation failed - No registration ID provided')
      throw new BadRequestException('Registration ID is required')
    }

    this.logger.log(`Creating community for registration ID: ${registrationID}`)
    return await this.communityService.create(registrationID, communityInput)
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
    if (!communityID) {
      this.logger.error('communityUpdate mutation failed - No community ID provided')
      throw new BadRequestException('Community ID is required')
    }

    if (!communityInput) {
      this.logger.error('communityUpdate mutation failed - No input provided')
      throw new BadRequestException('Community input is required')
    }

    this.logger.log(`Updating community ID: ${communityID}`)
    return await this.communityService.update(communityID, communityInput)
  }

  @Mutation(() => CommunityPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Community })
  async communityDelete(
    @Args('communityID', { type: () => Int })
    communityID: Community['id'],
  ) {
    if (!communityID) {
      this.logger.error('communityDelete mutation failed - No community ID provided')
      throw new BadRequestException('Community ID is required')
    }

    this.logger.log(`Deleting community ID: ${communityID}`)
    return await this.communityService.remove(communityID)
  }

  /**
   *  Field Resolver
   */

  @ResolveField(() => [CommunityGroup])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: CommunityGroup })
  async communityGroups(@Parent() community: tbl_reg_community) {
    if (!community?.id) {
      this.logger.error('communityGroups field resolver failed - Invalid community parent')
      throw new BadRequestException('Invalid community')
    }

    this.logger.debug(`Fetching community groups for community ID: ${community.id}`)

    const { id }: { id: Community['id'] } = community
    const communityID = id
    return await this.communityGroupService.findAll(communityID)
  }

  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() community: tbl_reg_community) {
    if (!community?.regID) {
      this.logger.error('registration field resolver failed - Invalid community or missing regID')
      throw new BadRequestException('Invalid community')
    }

    this.logger.debug(`Fetching registration for community ID: ${community.id}`)

    const regID = community.regID
    return await this.registrationService.findOne(regID)
  }
}
