import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { SchoolGroupService } from './school-group.service'
import { SchoolGroup, SchoolGroupPayload } from './entities/school-group.entity'
import { SchoolGroupInput } from './dto/school-group.input'
import { tbl_reg_schoolgroup, tbl_reg_school } from '@prisma/client'

@Resolver(() => SchoolGroup)
export class SchoolGroupResolver {
  constructor(private readonly schoolGroupService: SchoolGroupService) {}

  /** Queries */

  @Query(() => [SchoolGroup])
  async schoolGroups(@Args('schoolID', { type: () => Int }) schoolID: tbl_reg_schoolgroup['id']) {
    return this.schoolGroupService.findAll(schoolID)
  }

  @Query(() => SchoolGroup)
  async schoolGroup(@Args('schoolID', { type: () => Int }) schoolID: tbl_reg_schoolgroup['id']) {
    return this.schoolGroupService.findOne(schoolID)
  }

  /** Mutations */

  @Mutation(() => SchoolGroupPayload)
  async schoolGroupCreate(
    @Args('schoolID', { type: () => Int }) schoolID: tbl_reg_school['id'],
    @Args('schoolGroupInput', { type: () => SchoolGroupInput })
    schoolGroupInput: SchoolGroupInput
  ) {
    return this.schoolGroupService.create(schoolID, schoolGroupInput)
  }

  @Mutation(() => SchoolGroupPayload)
  async schoolGroupUpdate(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id'],
    @Args('schoolGroupInput', { type: () => SchoolGroupInput })
    schoolGroupInput: SchoolGroupInput
  ) {
    return this.schoolGroupService.update(schoolGroupID, schoolGroupInput)
  }

  @Mutation(() => SchoolGroupPayload)
  async schoolGroupDelete(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id']
  ) {
    return this.schoolGroupService.remove(schoolGroupID)
  }
}
