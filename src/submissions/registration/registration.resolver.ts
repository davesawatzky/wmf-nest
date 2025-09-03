import { UseGuards } from '@nestjs/common/decorators'
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
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PerformerType } from '@/common.entity'
import { CommunityService } from '@/submissions/community/community.service'
import { Community } from '@/submissions/community/entities/community.entity'
import { Group } from '@/submissions/group/entities/group.entity'
import { GroupService } from '@/submissions/group/group.service'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { PerformerService } from '@/submissions/performer/performer.service'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity'
import { RegisteredClassService } from '@/submissions/registered-class/registered-class.service'
import { School } from '@/submissions/school/entities/school.entity'
import { SchoolService } from '@/submissions/school/school.service'
import { Teacher } from '@/submissions/teacher/entities/teacher.entity'
import { TeacherService } from '@/submissions/teacher/teacher.service'
import { User } from '@/user/entities/user.entity'
import { UserService } from '@/user/user.service'
// import { RegistrationSearchFilters } from './dto/registration-search-filters.input'
import { RegistrationInput } from './dto/registration.input'
import {
  Registration,
  RegistrationPayload,
} from './entities/registration.entity'
import { RegistrationService } from './registration.service'

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
  // @ApplySearchFilters('Registration', [
  //   'id',
  //   'userID',
  //   'label',
  //   'performerType',
  //   'teacherID',
  //   'createdAt',
  //   'updatedAt',
  // ])
  async registrations(
    @Context() context,
    @Args('performerType', { nullable: true, type: () => PerformerType })
    performerType?: Registration['performerType'] | null,
    // @Args('page', { type: () => Int, nullable: true }) page?: number,
    // @Args('limit', { type: () => Int, nullable: true }) take?: number,
    // @Args('sortField', { type: () => String, nullable: true }) sortField?: string,
    // @Args('sortOrder', { type: () => String, nullable: true }) sortOrder?: 'asc' | 'desc',
    // @Args('searchFilters', { type: () => RegistrationSearchFilters, nullable: true })
    // searchFilters?: RegistrationSearchFilters,
  ) {
    // const skip = (page - 1) * take
    return await this.registrationService.findAll(
      context.req.user.admin ? undefined : context.req.user.id,
      performerType,
      undefined,
      // skip,
      // take,
      // sortField,
      // sortOrder,
      // searchFilters,
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
