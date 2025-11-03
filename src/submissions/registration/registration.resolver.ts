import { BadRequestException, Logger } from '@nestjs/common'
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
import { Community } from '@/submissions/community/entities/community.entity'
import { Group } from '@/submissions/group/entities/group.entity'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity'
import { School } from '@/submissions/school/entities/school.entity'
import { Teacher } from '@/submissions/teacher/entities/teacher.entity'
import { User } from '@/user/entities/user.entity'
// import { RegistrationSearchFilters } from './dto/registration-search-filters.input'
import { RegistrationInput } from './dto/registration.input'
import {
  Registration,
  RegistrationPayload,
} from './entities/registration.entity'
import { RegistrationDataLoader } from './registration.dataloader'
import { RegistrationService } from './registration.service'

@Resolver(() => Registration)
@UseGuards(JwtAuthGuard)
export class RegistrationResolver {
  private readonly logger = new Logger(RegistrationResolver.name)

  constructor(
    private readonly registrationService: RegistrationService,
    private readonly registrationDataLoader: RegistrationDataLoader,
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
    const isAdmin = context.req.user?.roles?.includes('admin')
    const userID = context.req.user?.id

    this.logger.log(`Fetching registrations${isAdmin ? ' (admin query)' : userID ? ` for user ID: ${userID}` : ''}${performerType ? `, performerType: ${performerType}` : ''}`)

    // const skip = (page - 1) * take
    return await this.registrationService.findAll(
      isAdmin ? null : userID,
      performerType,
      null,
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
    this.logger.log(`Fetching registration ID: ${id}`)
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
    let newLabel = label
    if (!newLabel || newLabel.trim() === '') {
      newLabel = 'Registration Form'
    }
    const userID = context.req.user?.id
    this.logger.log(`Creating registration for user ID: ${userID}, performerType: ${performerType}, label: ${newLabel}`)
    return await this.registrationService.create(
      userID,
      performerType,
      newLabel,
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
    this.logger.log(`Updating registration ID: ${registrationID}`)
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
    this.logger.log(`Deleting registration ID: ${registrationID}`)
    return await this.registrationService.remove(registrationID)
  }

  /** Field Resolvers */

  @ResolveField(() => User)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  async user(@Parent() registration: tbl_registration) {
    if (!registration?.userID) {
      this.logger.warn('user field resolver - missing userID')
      return null
    }
    this.logger.debug(`Fetching user for registration ID: ${registration.id}`)
    // Use DataLoader to batch user queries
    return await this.registrationDataLoader.userLoader.load(registration.userID)
  }

  @ResolveField(() => [Performer])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Performer })
  async performers(@Parent() registration: tbl_registration) {
    if (!registration?.id) {
      this.logger.warn('performers field resolver - missing id')
      return null
    }
    this.logger.debug(`Fetching performers for registration ID: ${registration.id}`)
    // Use DataLoader to batch performers queries
    return await this.registrationDataLoader.performersLoader.load(registration.id)
  }

  @ResolveField(() => [RegisteredClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: RegisteredClass })
  async registeredClasses(@Parent() registration: tbl_registration) {
    if (!registration?.id) {
      this.logger.warn('registeredClasses field resolver - missing id')
      return null
    }
    this.logger.debug(`Fetching registered classes for registration ID: ${registration.id}`)
    // Use DataLoader to batch registered classes queries
    return await this.registrationDataLoader.registeredClassesLoader.load(registration.id)
  }

  @ResolveField(() => Group)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Group })
  async group(@Parent() registration: tbl_registration) {
    if (!registration?.id) {
      this.logger.warn('group field resolver - missing id')
      return null
    }
    this.logger.debug(`Fetching group for registration ID: ${registration.id}`)
    // Use DataLoader to batch group queries
    return await this.registrationDataLoader.groupLoader.load(registration.id)
  }

  @ResolveField(() => Community)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Community })
  async community(@Parent() registration: tbl_registration) {
    if (!registration?.id) {
      this.logger.warn('community field resolver - missing id')
      return null
    }
    this.logger.debug(`Fetching community for registration ID: ${registration.id}`)
    // Use DataLoader to batch community queries
    return await this.registrationDataLoader.communityLoader.load(registration.id)
  }

  @ResolveField(() => Teacher)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Teacher })
  async teacher(@Parent() registration: tbl_registration) {
    if (!registration) {
      this.logger.warn('teacher field resolver - invalid registration')
      return null
    }
    const { teacherID }: { teacherID: Teacher['id'] } = registration
    // Teacher is optional, so return null if not set
    if (!teacherID) {
      this.logger.debug(`No teacher assigned to registration ID: ${registration.id}`)
      return null
    }
    this.logger.debug(`Fetching teacher for registration ID: ${registration.id}`)
    // Use DataLoader to batch teacher queries
    return await this.registrationDataLoader.teacherLoader.load(teacherID)
  }

  @ResolveField(() => School)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: School })
  async school(@Parent() registration: tbl_registration) {
    if (!registration?.id) {
      this.logger.warn('school field resolver - missing id')
      return null
    }
    this.logger.debug(`Fetching school for registration ID: ${registration.id}`)
    // Use DataLoader to batch school queries
    return await this.registrationDataLoader.schoolLoader.load(registration.id)
  }
}
