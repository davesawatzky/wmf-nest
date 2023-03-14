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
import { CommunityService } from '../community/community.service'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Resolver(() => School)
@UseGuards(JwtAuthGuard)
export class SchoolResolver {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly communityService: CommunityService,
  ) {}

  /** Queries */

  @Query(() => [School])
  async schools() {
    return this.schoolService.findAll()
  }

  @Query(() => School)
  async school(@Args('schoolID', { type: () => Int }) schoolID: School['id']) {
    return this.schoolService.findOne(null, schoolID)
  }

  /** Mutations */

  @Mutation(() => SchoolPayload)
  async SchoolCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('schoolInput', { type: () => SchoolInput })
    schoolInput: SchoolInput,
  ) {
    return this.schoolService.create(registrationID, schoolInput)
  }

  @Mutation(() => SchoolPayload)
  async schoolUpdate(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id'],
    @Args('schoolInput', { type: () => SchoolInput })
    schoolInput: SchoolInput,
  ) {
    return this.schoolService.update(schoolID, schoolInput)
  }

  @Mutation(() => SchoolPayload)
  async schoolDelete(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id'],
  ) {
    return this.schoolService.remove(schoolID)
  }

  /** Field Resolver */

  @ResolveField()
  async schoolGroups(@Parent() school: tbl_reg_school) {
    const { id }: { id: School['id'] } = school
    const schoolAsRegID = id
    return this.communityService.findAll(schoolAsRegID)
  }
}
