import { HttpException, HttpStatus } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_reg_school, tbl_reg_schoolgroup } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { School } from '@/submissions/school/entities/school.entity'
import { SchoolService } from '@/submissions/school/school.service'
import { SchoolGroupInput } from './dto/school-group.input'
import { SchoolGroup, SchoolGroupPayload } from './entities/school-group.entity'
import { SchoolGroupService } from './school-group.service'

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
    return await this.schoolGroupService.findAll(schoolID)
  }

  @Query(() => SchoolGroup)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: SchoolGroup })
  async schoolGroup(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: tbl_reg_schoolgroup['id'],
  ) {
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
    return await this.schoolGroupService.update(schoolGroupID, schoolGroupInput)
  }

  @Mutation(() => SchoolGroupPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: SchoolGroup })
  async schoolGroupDelete(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id'],
  ) {
    return await this.schoolGroupService.remove(schoolGroupID)
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
