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
import { SchoolGroup } from '@/submissions/school-group/entities/school-group.entity'
import { SchoolInput } from './dto/school.input'
import { School, SchoolPayload } from './entities/school.entity'
import { SchoolDataLoader } from './school.dataloader'
import { SchoolService } from './school.service'

@Resolver(() => School)
@UseGuards(JwtAuthGuard)
export class SchoolResolver {
  private readonly logger = new Logger(SchoolResolver.name)

  constructor(
    private readonly schoolService: SchoolService,
    private readonly schoolDataLoader: SchoolDataLoader,
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
    if (!school?.id) {
      this.logger.error('schoolGroups field resolver failed - Invalid school or missing id')
      return null
    }
    // Use DataLoader to batch school group queries
    return await this.schoolDataLoader.schoolGroupsLoader.load(school.id)
  }

  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Registration })
  async registration(@Parent() school: tbl_reg_school) {
    if (!school?.regID) {
      this.logger.error('registration field resolver failed - Invalid school or missing regID')
      return null
    }
    // Use DataLoader to batch registration queries
    return await this.schoolDataLoader.registrationLoader.load(school.regID)
  }
}
