import {
  Resolver,
  Parent,
  Query,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql'
import { SchoolService } from './school.service'
import { SchoolInput } from 'src/graphql'
// import { CreateSchoolInput } from './dto/create-school.input'
// import { UpdateSchoolInput } from './dto/update-school.input'
import { tbl_registration, tbl_reg_school } from '@prisma/client'
import { CommunityService } from '../community/community.service'

@Resolver('School')
export class SchoolResolver {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly communityService: CommunityService,
  ) {}

  @Mutation('schoolCreate')
  async create(
    @Args('registrationID') registrationID: tbl_registration['id'],
    @Args('schoolInput') schoolInput: Partial<SchoolInput>,
  ) {
    return this.schoolService.create(registrationID, schoolInput)
  }

  @Query('schools')
  async findAll() {
    return this.schoolService.findAll()
  }

  @Query('school')
  async findOne(@Args('schoolID') schoolID: tbl_reg_school['id']) {
    return this.schoolService.findOne(null, schoolID)
  }

  @Mutation('schoolUpdate')
  async update(
    @Args('schoolID') schoolID: tbl_reg_school['id'],
    @Args('schoolInput') schoolInput: Partial<SchoolInput>,
  ) {
    return this.schoolService.update(schoolID, schoolInput)
  }

  @Mutation('schoolDelete')
  async remove(@Args('schoolID') schoolID: tbl_reg_school['id']) {
    return this.schoolService.remove(schoolID)
  }

  /** Field Resolver */

  @ResolveField('schoolGroups')
  async schoolGroups(@Parent() school: tbl_reg_school) {
    const { id }: { id: tbl_reg_school['id'] } = school
    const schoolAsRegID = id
    return this.communityService.findAll(schoolAsRegID)
  }
}
