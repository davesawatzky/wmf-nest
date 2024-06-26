import {
  Resolver,
  Parent,
  Query,
  Mutation,
  Args,
  ResolveField,
  Int,
} from '@nestjs/graphql'
import { SchoolService } from './school.service'
import { SchoolInput } from './dto/school.input'
import { SchoolPayload } from './entities/school.entity'
import { School } from './entities/school.entity'
import { tbl_registration, tbl_reg_school } from '@prisma/client'
import { SchoolGroupService } from '../school-group/school-group.service'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { SchoolGroup } from '../school-group/entities/school-group.entity'

@Resolver(() => School)
@UseGuards(JwtAuthGuard)
export class SchoolResolver {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly schoolGroupService: SchoolGroupService
  ) {}

  /** Queries */

  @Query(() => [School])
  async schools() {
    return await this.schoolService.findAll()
  }

  @Query(() => School)
  async school(@Args('schoolID', { type: () => Int }) schoolID: School['id']) {
    return await this.schoolService.findOne(undefined, schoolID)
  }

  /** Mutations */

  @Mutation(() => SchoolPayload)
  async schoolCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('schoolInput', { type: () => SchoolInput, nullable: true })
    schoolInput: Partial<SchoolInput>
  ) {
    return await this.schoolService.create(registrationID, schoolInput)
  }

  @Mutation(() => SchoolPayload)
  async schoolUpdate(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id'],
    @Args('schoolInput', { type: () => SchoolInput })
    schoolInput: Partial<SchoolInput>
  ) {
    return await this.schoolService.update(schoolID, schoolInput)
  }

  @Mutation(() => SchoolPayload)
  async schoolDelete(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id']
  ) {
    return await this.schoolService.remove(schoolID)
  }

  /** Field Resolver */

  @ResolveField(() => [SchoolGroup])
  async schoolGroups(@Parent() school: tbl_reg_school) {
    const { id }: { id: School['id'] } = school
    const schoolID = id
    return await this.schoolGroupService.findAll(schoolID)
  }
}
