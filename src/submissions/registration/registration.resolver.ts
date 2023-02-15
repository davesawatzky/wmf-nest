import {
  Resolver,
  Parent,
  Query,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql'
import { RegistrationService } from './registration.service'
import { RegistrationInput, Registration, SGSlabel } from 'src/graphql'
import { tbl_registration, tbl_reg_performer, tbl_user } from '@prisma/client'
import { PerformerService } from '../performer/performer.service'
import { RegisteredClassService } from '../registered-class/registered-class.service'
import { UserService } from 'src/user/user.service'
import { GroupService } from '../group/group.service'
import { TeacherService } from '../teacher/teacher.service'
import { CommunityService } from '../community/community.service'
import { SchoolService } from '../school/school.service'
// import { CreateRegistrationInput } from './dto/create-registration.input';
// import { UpdateRegistrationInput } from './dto/update-registration.input';

@Resolver('Registration')
export class RegistrationResolver {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly performerService: PerformerService,
    private readonly userService: UserService,
    private readonly registeredClassService: RegisteredClassService,
    private readonly groupService: GroupService,
    private readonly communityService: CommunityService,
    private readonly schoolService: SchoolService,
    private readonly teacherService: TeacherService,
  ) {}

  /** Queries */

  @Query('registrations')
  async findAll(
    @Args('userID') userID?: tbl_user['id'],
    @Args('performerType') performerType?: SGSlabel,
  ) {
    return this.registrationService.findAll(userID, performerType)
  }

  @Query('registration')
  async findOne(@Args('id') id: tbl_registration['id']) {
    return this.registrationService.findOne(id)
  }

  /** Mutations */

  @Mutation('registrationCreate')
  async create(
    @Args('performerType') performerType: Registration['performerType'],
    @Args('label') label: Registration['label'],
  ) {
    return this.registrationService.create(performerType, label)
  }

  @Mutation('registrationUpdate')
  async update(
    @Args('registrationID') registrationID: Registration['id'],
    @Args('registration') registration: Partial<RegistrationInput>,
  ) {
    return this.registrationService.update(registrationID, registration)
  }

  @Mutation('registrationDelete')
  async remove(@Args('id') id: tbl_registration['id']) {
    return this.registrationService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField('user')
  async user(@Parent() registration: tbl_registration) {
    const { userID }: { userID: tbl_registration['userID'] } = registration
    return this.userService.findOne(userID)
  }
  @ResolveField('performers')
  async performers(@Parent() registration: tbl_registration) {
    const { id }: { id: tbl_registration['id'] } = registration
    const registrationID = id
    return this.performerService.findAll(registrationID)
  }
  @ResolveField('registeredClasses')
  async registeredClasses(@Parent() registration: tbl_registration) {
    const { id }: { id: tbl_registration['id'] } = registration
    const registrationID = id
    return this.registeredClassService.findAll(registrationID)
  }
  @ResolveField('groups')
  async groups(@Parent() registration: tbl_registration) {
    const { id }: { id: tbl_registration['id'] } = registration
    const registrationID = id
    return this.groupService.findAll(registrationID)
  }
  @ResolveField('communities')
  async communities(@Parent() registration: tbl_registration) {
    const { id }: { id: tbl_registration['id'] } = registration
    const registrationID = id
    return this.communityService.findAll(registrationID)
  }
  @ResolveField('teacher')
  async teacher(@Parent() registration: tbl_registration) {
    const { id }: { id: tbl_registration['id'] } = registration
    const registrationID = id
    return this.teacherService.findOne(registrationID)
  }
  @ResolveField('school')
  async school(@Parent() registration: tbl_registration) {
    const { id }: { id: tbl_registration['id'] } = registration
    const registrationID = id
    return this.schoolService.findOne(registrationID)
  }
}
