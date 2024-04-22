import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { tbl_registration } from '@prisma/client'
import { UseGuards } from '@nestjs/common/decorators'
import { RegistrationInput } from './dto/registration.input'
import {
  Registration,
  RegistrationPayload,
} from './entities/registration.entity'
import { RegistrationService } from './registration.service'
import { PerformerService } from '@/submissions/performer/performer.service'
import { RegisteredClassService } from '@/submissions/registered-class/registered-class.service'
import { UserService } from '@/user/user.service'
import { GroupService } from '@/submissions/group/group.service'
import { TeacherService } from '@/submissions/teacher/teacher.service'
import { CommunityService } from '@/submissions/community/community.service'
import { SchoolService } from '@/submissions/school/school.service'
import { PerformerType } from '@/common.entity'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { User } from '@/user/entities/user.entity'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity'
import { Group } from '@/submissions/group/entities/group.entity'
import { Community } from '@/submissions/community/entities/community.entity'
import { School } from '@/submissions/school/entities/school.entity'
import { Teacher } from '@/submissions/teacher/entities/teacher.entity'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { Action } from '@/ability/ability.factory'

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
    private readonly teacherService: TeacherService,
  ) {}

  /** Queries */

  @Query(() => [Registration])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registrations(
    @Context() context,
    @Args('performerType', { nullable: true, type: () => PerformerType })
    performerType?: Registration['performerType'] | null,
  ) {
    return await this.registrationService.findAll(
      // context.req.user.id,
      undefined,
      performerType,
    )
  }

  @Query(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Args('id', { type: () => Int }) id: Registration['id']) {
    return await this.registrationService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => RegistrationPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Registration })
  async registrationCreate(
    @Context() context,
    @Args('performerType', { type: () => PerformerType })
    performerType: PerformerType,
    @Args('label', { type: () => String })
    label: Registration['label'],
  ) {
    return await this.registrationService.create(
      context.req.user.id,
      performerType,
      label,
    )
  }

  @Mutation(() => RegistrationPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Registration })
  async registrationUpdate(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
    @Args('registrationInput', { type: () => RegistrationInput })
    registrationInput: Partial<RegistrationInput>,
  ) {
    return await this.registrationService.update(
      registrationID,
      registrationInput,
    )
  }

  @Mutation(() => RegistrationPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Registration })
  async registrationDelete(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
  ) {
    return await this.registrationService.remove(registrationID)
  }

  /** Field Resolvers */

  @ResolveField(() => User)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  async user(@Parent() registration: tbl_registration) {
    const { userID }: { userID: tbl_registration['userID'] } = registration
    return await this.userService.findOne(userID)
  }

  @ResolveField(() => [Performer])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Performer })
  async performers(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.performerService.findAll(registrationID)
  }

  @ResolveField(() => [RegisteredClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: RegisteredClass })
  async registeredClasses(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.registeredClassService.findAll(registrationID)
  }

  @ResolveField(() => Group)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Group })
  async group(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.groupService.findOne(registrationID)
  }

  @ResolveField(() => Community)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Community })
  async community(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.communityService.findOne(registrationID)
  }

  @ResolveField(() => Teacher)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Teacher })
  async teacher(@Parent() registration: tbl_registration) {
    const { teacherID }: { teacherID: Teacher['id'] } = registration
    return await this.teacherService.findOne(teacherID)
  }

  @ResolveField(() => School)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: School })
  async school(@Parent() registration: tbl_registration) {
    const { id }: { id: Registration['id'] } = registration
    const registrationID = id
    return await this.schoolService.findOne(registrationID)
  }
}
