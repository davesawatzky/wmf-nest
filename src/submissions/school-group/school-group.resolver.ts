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
import { tbl_reg_school, tbl_reg_schoolgroup } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { School } from '@/submissions/school/entities/school.entity'
import { SchoolService } from '@/submissions/school/school.service'
import { SchoolGroupInput } from './dto/school-group.input'
import {
  SchoolGroup,
  SchoolGroupPayload,
} from './entities/school-group.entity'
import { SchoolGroupService } from './school-group.service'

@Resolver(() => SchoolGroup)
@UseGuards(JwtAuthGuard)
export class SchoolGroupResolver {
  private readonly logger = new Logger(SchoolGroupResolver.name)

  constructor(
    private readonly schoolGroupService: SchoolGroupService,
    private readonly schoolService: SchoolService,
  ) {}

  /** Queries */

  @Query(() => [SchoolGroup])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: SchoolGroup })
  async schoolGroups(
    @Args('schoolID', { type: () => Int, nullable: true })
    schoolID: tbl_reg_schoolgroup['schoolID'],
  ) {
    this.logger.log(`Fetching school groups${schoolID ? ` for school ID: ${schoolID}` : ''}`)
    return await this.schoolGroupService.findAll(schoolID)
  }

  @Query(() => SchoolGroup)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: SchoolGroup })
  async schoolGroup(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: tbl_reg_schoolgroup['id'],
  ) {
    this.logger.log(`Fetching school group ID: ${schoolGroupID}`)
    return await this.schoolGroupService.findOne(schoolGroupID)
  }

  /** Mutations */

  @Mutation(() => SchoolGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: SchoolGroup })
  async schoolGroupCreate(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id'],
    @Args('schoolGroupInput', { type: () => SchoolGroupInput, nullable: true })
    schoolGroupInput: Partial<SchoolGroupInput>,
  ) {
    this.logger.log(`Creating school group for school ID: ${schoolID}`)
    return await this.schoolGroupService.create(schoolID, schoolGroupInput)
  }

  @Mutation(() => SchoolGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: SchoolGroup })
  async schoolGroupUpdate(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id'],
    @Args('schoolGroupInput', { type: () => SchoolGroupInput })
    schoolGroupInput: Partial<SchoolGroupInput>,
  ) {
    this.logger.log(`Updating school group ID: ${schoolGroupID}`)
    return await this.schoolGroupService.update(
      schoolGroupID,
      schoolGroupInput,
    )
  }

  @Mutation(() => SchoolGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: SchoolGroup })
  async schoolGroupDelete(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id'],
  ) {
    this.logger.log(`Deleting school group ID: ${schoolGroupID}`)
    return await this.schoolGroupService.remove(schoolGroupID)
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => School)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: School })
  async school(@Parent() schoolGroup: tbl_reg_schoolgroup) {
    if (!schoolGroup?.schoolID) {
      this.logger.error('school field resolver failed - Invalid schoolGroup or missing schoolID')
      return null
    }
    this.logger.debug(`Fetching school for school group ID: ${schoolGroup.id}`)
    const schoolID = schoolGroup.schoolID
    return await this.schoolService.findOne(undefined, schoolID)
  }
}
