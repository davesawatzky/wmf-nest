import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { SchoolGroupService } from './school-group.service'
import { SchoolGroup, SchoolGroupPayload } from './entities/school-group.entity'
import { SchoolGroupInput } from './dto/school-group.input'
import { tbl_reg_schoolgroup, tbl_reg_school } from '@prisma/client'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

@Resolver(() => SchoolGroup)
@UseGuards(JwtAuthGuard)
export class SchoolGroupResolver {
  constructor(private readonly schoolGroupService: SchoolGroupService) {}

  /** Queries */

  @Query(() => [SchoolGroup])
  async schoolGroups(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_schoolgroup['schoolID']
  ) {
    return await this.schoolGroupService.findAll(schoolID)
  }

  @Query(() => SchoolGroup)
  async schoolGroup(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: tbl_reg_schoolgroup['id']
  ) {
    return await this.schoolGroupService.findOne(schoolGroupID)
  }

  /** Mutations */

  @Mutation(() => SchoolGroupPayload)
  async schoolGroupCreate(
    @Args('schoolID', { type: () => Int }) schoolID: tbl_reg_school['id']
  ) {
    return await this.schoolGroupService.create(schoolID)
  }

  @Mutation(() => SchoolGroupPayload)
  async schoolGroupUpdate(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id'],
    @Args('schoolGroupInput', { type: () => SchoolGroupInput })
    schoolGroupInput: Partial<SchoolGroupInput>
  ) {
    return await this.schoolGroupService.update(schoolGroupID, schoolGroupInput)
  }

  @Mutation(() => SchoolGroupPayload)
  async schoolGroupDelete(
    @Args('schoolGroupID', { type: () => Int })
    schoolGroupID: SchoolGroup['id']
  ) {
    return await this.schoolGroupService.remove(schoolGroupID)
  }
}
