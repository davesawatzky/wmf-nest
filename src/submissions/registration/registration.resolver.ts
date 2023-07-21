import {
  Resolver,
  Parent,
  Query,
  Mutation,
  Args,
  ResolveField,
  Int,
  Context,
} from '@nestjs/graphql'
import { RegistrationService } from './registration.service'
import { tbl_registration, tbl_user } from '@prisma/client'
import { PerformerService } from '../performer/performer.service'
import { RegisteredClassService } from '../registered-class/registered-class.service'
import { UserService } from '../../user/user.service'
import { GroupService } from '../group/group.service'
import { TeacherService } from '../teacher/teacher.service'
import { CommunityService } from '../community/community.service'
import { SchoolService } from '../school/school.service'
import {
  Registration,
  RegistrationPayload,
} from './entities/registration.entity'
import { RegistrationInput } from './dto/registration.input'
import { PerformerType } from '../../common.entity'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { User } from '../../user/entities/user.entity'

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
    @Args('performerType', { nullable: true, type: () => PerformerType })
    performerType?: Registration['performerType']
  ) {
    return await this.registrationService.findAll(
      context.req.user.id,
      performerType
    )
  }

  @Query(() => Registration)
  async registration(@Args('id', { type: () => Int }) id: Registration['id']) {
    return await this.registrationService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => RegistrationPayload)
  async registrationCreate(
    @Args('performerType', { type: () => PerformerType })
    performerType: PerformerType,
    @Args('label', { type: () => String })
    label: Registration['label'],
    @Context() context
  ) {
    return await this.registrationService.create(
      context.req.user.id,
      performerType,
      label
    )
  }

  @Mutation(() => RegistrationPayload)
  async registrationUpdate(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
    @Args('registrationInput', { type: () => RegistrationInput })
    registrationInput: RegistrationInput
  ) {
    return await this.registrationService.update(
      registrationID,
      registrationInput
    )
  }

  @Mutation(() => RegistrationPayload)
  async registrationDelete(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id']
  ) {
    return await this.registrationService.remove(registrationID)
  }

  /** Field Resolvers */

  @ResolveField()
  async user(@Parent() registration: tbl_registration) {
    const { userID }: { userID: tbl_registration['userID'] } = registration
    return await this.userService.findOne(userID)
  }
  @ResolveField()
  async performers(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.performerService.findAll(registrationID)
  }
  @ResolveField()
  async registeredClasses(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.registeredClassService.findAll(registrationID)
  }
  @ResolveField()
  async group(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.groupService.findOne(registrationID)
  }
  @ResolveField()
  async community(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.communityService.findAll(registrationID)
  }
  @ResolveField()
  async teacher(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.teacherService.findOne(null, registrationID)
  }
  @ResolveField()
  async school(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.schoolService.findOne(registrationID)
  }
}
