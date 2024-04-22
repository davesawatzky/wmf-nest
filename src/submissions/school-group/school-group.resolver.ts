import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_reg_school, tbl_reg_schoolgroup } from '@prisma/client'
import { UseGuards } from '@nestjs/common/decorators'
import { HttpException, HttpStatus } from '@nestjs/common'
import { SchoolGroupService } from './school-group.service'
import { SchoolGroup, SchoolGroupPayload } from './entities/school-group.entity'
import { SchoolGroupInput } from './dto/school-group.input'
import { School } from '@/submissions/school/entities/school.entity'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { Action } from '@/ability/ability.factory'
import { SchoolService } from '@/submissions/school/school.service'

@Resolver(() => SchoolGroup)
@UseGuards(JwtAuthGuard)
export class SchoolGroupResolver {
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
    try {
      return await this.schoolGroupService.findAll(schoolID)
    }
    catch (error) {
      throw new HttpException('School groups not found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => SchoolGroup)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: SchoolGroup })
  async schoolGroup(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: tbl_reg_schoolgroup['id'],
  ) {
    try {
      return await this.schoolGroupService.findOne(schoolGroupID)
    }
    catch (error) {
      throw new HttpException('School group not found', HttpStatus.NOT_FOUND)
    }
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
    try {
      return await this.schoolGroupService.create(schoolID, schoolGroupInput)
    }
    catch (error) {
      throw new HttpException('Cannot create school group', HttpStatus.INTERNAL_SERVER_ERROR)
    }
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
    try {
      return await this.schoolGroupService.update(schoolGroupID, schoolGroupInput)
    }
    catch (error) {
      throw new HttpException('Cannot update school group', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Mutation(() => SchoolGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: SchoolGroup })
  async schoolGroupDelete(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id'],
  ) {
    try {
      return await this.schoolGroupService.remove(schoolGroupID)
    }
    catch (error) {
      throw new HttpException('Cannot delete school group', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => School)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: School })
  async school(@Parent() schoolGroup: tbl_reg_schoolgroup) {
    const schoolID = schoolGroup.schoolID
    return await this.schoolService.findOne(undefined, schoolID)
  }
}
