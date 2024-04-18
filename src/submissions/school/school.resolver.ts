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
import { SchoolGroupService } from '../school-group/school-group.service'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { SchoolGroup } from '../school-group/entities/school-group.entity'
import {RegistrationService} from '../registration/registration.service'
import {AbilitiesGuard} from '@/ability/abilities.guard'
import {CheckAbilities} from '@/ability/abilities.decorator'
import {Action} from '@/ability/ability.factory'
import {HttpException, HttpStatus} from '@nestjs/common'
import {Registration} from '../registration/entities/registration.entity'

@Resolver(() => School)
@UseGuards(JwtAuthGuard)
export class SchoolResolver {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly schoolGroupService: SchoolGroupService,
    private readonly registrationService: RegistrationService
  ) {}

  /** Queries */

  @Query(() => [School])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: 'admin'})
  async schools() {
    try {
      return await this.schoolService.findAll()
    } catch (error) {
      throw new HttpException('No schools found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => School)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: School})
  async school(
    @Args('registrationID', {type: () => Int, nullable: true})
    registrationID: tbl_registration['id'],
    @Args('schoolID', {type: () => Int, nullable: true})
    schoolID: School['id']
  ) {
    try {
      return await this.schoolService.findOne(registrationID, schoolID)
    } catch (error) {
      throw new HttpException('School not found', HttpStatus.NOT_FOUND)
    }
  }

  /** Mutations */

  @Mutation(() => SchoolPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Create, subject: School})
  async schoolCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('schoolInput', { type: () => SchoolInput, nullable: true })
    schoolInput: Partial<SchoolInput>
  ) {
    try {
      return await this.schoolService.create(registrationID, schoolInput)
    } catch (error) {
      throw new HttpException('School not created', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Mutation(() => SchoolPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Update, subject: School})
  async schoolUpdate(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id'],
    @Args('schoolInput', { type: () => SchoolInput })
    schoolInput: Partial<SchoolInput>
  ) {
    try {
      return await this.schoolService.update(schoolID, schoolInput)
    } catch (error) {
      throw new HttpException('School not updated', HttpStatus.NOT_MODIFIED)
    }
  }

  @Mutation(() => SchoolPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Delete, subject: School})
  async schoolDelete(
    @Args('schoolID', { type: () => Int })
    schoolID: tbl_reg_school['id']
  ) {
    try {
      return await this.schoolService.remove(schoolID)
    } catch (error) {
      throw new HttpException('School not deleted', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  /**
   * Field Resolvers
   */

  @ResolveField(() => [SchoolGroup])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: SchoolGroup})
  async schoolGroups(@Parent() school: tbl_reg_school) {
    const { id }: { id: School['id'] } = school
    const schoolID = id
    return await this.schoolGroupService.findAll(schoolID)
  }

  @ResolveField(() => Registration)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: Registration})
  async registration(@Parent() school: tbl_reg_school) {
    const regId = school.regID
    return await this.registrationService.findOne(regId)
  }
}
