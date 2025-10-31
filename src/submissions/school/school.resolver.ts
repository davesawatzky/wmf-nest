import { BadRequestException, Logger } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { tbl_reg_school, tbl_registration } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { SchoolGroup } from '@/submissions/school-group/entities/school-group.entity'
import { SchoolGroupService } from '@/submissions/school-group/school-group.service'
import { SchoolInput } from './dto/school.input'
import { School, SchoolPayload } from './entities/school.entity'
import { SchoolService } from './school.service'

@Resolver(() => School)
@UseGuards(JwtAuthGuard)
export class SchoolResolver {
  private readonly logger = new Logger(SchoolResolver.name)

  constructor(
    private readonly schoolService: SchoolService,
    private readonly schoolGroupService: SchoolGroupService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query(() => [School])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async schools() {
    this.logger.log('Fetching all schools (admin query)')
    return await this.schoolService.findAll()
  }

  @Query(() => School)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: School })
  async school(
    @Args('registrationID', { type: () => Int, nullable: true })
    registrationID: tbl_registration['id'],
    @Args('schoolID', { type: () => Int, nullable: true })
    schoolID: School['id'],
  ) {
    // ✅ Defensive check - at least one parameter is required
    if (!registrationID && !schoolID) {
      this.logger.error('school query failed - Either registrationID or schoolID is required')
      throw new BadRequestException('Either registration ID or school ID is required')
    }

    this.logger.log(`Fetching school${registrationID ? ` for registration ID: ${registrationID}` : ` with ID: ${schoolID}`}`)
    return await this.schoolService.findOne(registrationID, schoolID)
  }

  /** Mutations */

  @Mutation(() => SchoolPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: School })
  async schoolCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('schoolInput', { type: () => SchoolInput, nullable: true })
    schoolInput: Partial<SchoolInput>,
  ) {
    // ✅ Defensive check - ensure registrationID is provided
    if (!registrationID) {
      this.logger.error('schoolCreate mutation failed - registrationID is required')
      throw new BadRequestException('Registration ID is required')
    }

    this.logger.log(`Creating school for registration ID: ${registrationID}`)
    return await this.schoolService.create(registrationID, schoolInput)
  }

  @Mutation(() => SchoolPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: School })
  async schoolUpdate(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id'],
    @Args('schoolInput', { type: () => SchoolInput })
    schoolInput: Partial<SchoolInput>,
  ) {
    // ✅ Defensive checks - ensure schoolID and input are provided
    if (!schoolID) {
      this.logger.error('schoolUpdate mutation failed - schoolID is required')
      throw new BadRequestException('School ID is required')
    }

    if (!schoolInput || Object.keys(schoolInput).length === 0) {
      this.logger.error('schoolUpdate mutation failed - schoolInput is required')
      throw new BadRequestException('School input is required')
    }

    this.logger.log(`Updating school ID: ${schoolID}`)
    return await this.schoolService.update(schoolID, schoolInput)
  }

  @Mutation(() => SchoolPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: School })
  async schoolDelete(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id'],
  ) {
    // ✅ Defensive check - ensure schoolID is provided
    if (!schoolID) {
      this.logger.error('schoolDelete mutation failed - schoolID is required')
      throw new BadRequestException('School ID is required')
    }

    this.logger.log(`Deleting school ID: ${schoolID}`)
    return await this.schoolService.remove(schoolID)
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => [SchoolGroup])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: SchoolGroup })
  async schoolGroups(@Parent() school: tbl_reg_school) {
    // ✅ Defensive check - ensure parent exists and has id
    if (!school?.id) {
      this.logger.error('schoolGroups field resolver failed - Invalid school or missing id')
      throw new BadRequestException('Invalid school')
    }

    this.logger.debug(`Fetching school groups for school ID: ${school.id}`)

    const { id }: { id: School['id'] } = school
    const schoolID = id
    return await this.schoolGroupService.findAll(schoolID)
  }

  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() school: tbl_reg_school) {
    // ✅ Defensive check - ensure parent exists and has regID
    if (!school?.regID) {
      this.logger.error('registration field resolver failed - Invalid school or missing regID')
      throw new BadRequestException('Invalid school')
    }

    this.logger.debug(`Fetching registration for school ID: ${school.id}`)

    const regId = school.regID
    return await this.registrationService.findOne(regId)
  }
}
