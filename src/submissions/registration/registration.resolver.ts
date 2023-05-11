import { Resolver, Parent, Query, Mutation, Args, ResolveField, Int, Context } from '@nestjs/graphql'
import { RegistrationService } from './registration.service'
import { tbl_registration, tbl_user } from '@prisma/client'
import { PerformerService } from '../performer/performer.service'
import { RegisteredClassService } from '../registered-class/registered-class.service'
import { UserService } from 'src/user/user.service'
import { GroupService } from '../group/group.service'
import { TeacherService } from '../teacher/teacher.service'
import { CommunityService } from '../community/community.service'
import { SchoolService } from '../school/school.service'
import { Registration, RegistrationPayload } from './entities/registration.entity'
import { RegistrationInput } from './dto/registration.input'
import { SGSLabel } from 'src/common.entity'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from 'src/user/entities/user.entity'

@Resolver(() => Registration)
@UseGuards(JwtAuthGuard)
export class RegistrationResolver {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly performerService: PerformerService,
    private readonly userService: UserService,
    private readonly registeredClassService: RegisteredClassService,
    private readonly groupService: GroupService,
    private readonly communityService: CommunityService,
    private readonly schoolService: SchoolService,
    private readonly teacherService: TeacherService
  ) {}

  /** Queries */

  @Query(() => [Registration])
  async registrations(
    @Context() context,
    @Args('userID', { type: () => Int }) userID?: tbl_user['id'],
    @Args('performerType', {nullable: true, type: () => SGSLabel })
    performerType?: Registration['performerType']
  ) {
    console.log('-----Registrations Context: ', context)
    return this.registrationService.findAll(context.user.id, performerType)
  }

  @Query(() => Registration)
  async registration(@Args('id', { type: () => Int }) id: Registration['id']) {
    return this.registrationService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => RegistrationPayload)
  async registrationCreate(
    @Args('performerType', { type: () => SGSLabel })
    performerType: SGSLabel,
    @Args('label', { type: () => String })
    label: Registration['label'],
    @Context() context
  ) {
    console.log('-----Registration Create Context: ', context)
    return this.registrationService.create(context.req.user.id, performerType, label)
  }

  @Mutation(() => RegistrationPayload)
  async registrationUpdate(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
    @Args('registration', { type: () => RegistrationInput })
    registration: RegistrationInput
  ) {
    return this.registrationService.update(registrationID, registration)
  }

  @Mutation(() => RegistrationPayload)
  async registrationDelete(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id']
  ) {
    return this.registrationService.remove(registrationID)
  }

  /** Field Resolvers */

  @ResolveField()
  async user(@Parent() registration: tbl_registration) {
    const { userID }: { userID: tbl_registration['userID'] } = registration
    return this.userService.findOne(userID)
  }
  @ResolveField()
  async performers(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return this.performerService.findAll(registrationID)
  }
  @ResolveField()
  async registeredClasses(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return this.registeredClassService.findAll(registrationID)
  }
  @ResolveField()
  async groups(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return this.groupService.findAll(registrationID)
  }
  @ResolveField()
  async communities(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return this.communityService.findAll(registrationID)
  }
  @ResolveField()
  async teacher(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return this.teacherService.findOne(registrationID)
  }
  @ResolveField()
  async school(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return this.schoolService.findOne(registrationID)
  }
}
