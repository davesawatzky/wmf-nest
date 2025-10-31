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
import { tbl_reg_class, tbl_registration } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { Selection } from '@/submissions/selection/entities/selection.entity'
import { SelectionService } from '@/submissions/selection/selection.service'
import { PerformerService } from '../performer/performer.service'
import { RegisteredClassInput } from './dto/registered-class.input'
import {
  RegisteredClass,
  RegisteredClassPayload,
} from './entities/registered-class.entity'
import { RegisteredClassService } from './registered-class.service'

@Resolver(() => RegisteredClass)
@UseGuards(JwtAuthGuard)
export class RegisteredClassResolver {
  private readonly logger = new Logger(RegisteredClassResolver.name)

  constructor(
    private readonly registeredClassService: RegisteredClassService,
    private readonly selectionService: SelectionService,
    private readonly performerService: PerformerService,
  ) {}

  /** Queries */

  @Query(() => [RegisteredClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Manage, subject: RegisteredClass })
  async registeredClasses(
    @Context() context,
    @Args('registrationID', { nullable: true, type: () => Int })
    registrationID: tbl_registration['id'] | null,
  ) {
    const isAdmin = context.req.user?.roles?.includes('admin')
    this.logger.log(`Fetching registered classes${isAdmin ? ' (admin query)' : registrationID ? ` for registration ID: ${registrationID}` : ''}`)

    return await this.registeredClassService.findAll(
      isAdmin ? null : registrationID,
    )
  }

  @Query(() => RegisteredClass)
  async registeredClass(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id'],
  ) {
    if (!registeredClassID) {
      this.logger.error('registeredClass query failed - registeredClassID is required')
      throw new BadRequestException('Registered class ID is required')
    }

    this.logger.log(`Fetching registered class ID: ${registeredClassID}`)
    return await this.registeredClassService.findOne(registeredClassID)
  }

  /** Mutations */

  @Mutation(() => RegisteredClassPayload)
  async registeredClassCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('registeredClass', {
      type: () => RegisteredClassInput,
      nullable: true,
    })
    registeredClass: Partial<RegisteredClassInput> | null,
  ) {
    if (!registrationID) {
      this.logger.error('registeredClassCreate mutation failed - registrationID is required')
      throw new BadRequestException('Registration ID is required')
    }

    this.logger.log(`Creating registered class for registration ID: ${registrationID}`)
    return await this.registeredClassService.create(
      registrationID,
      registeredClass,
    )
  }

  @Mutation(() => RegisteredClassPayload)
  async registeredClassUpdate(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id'],
    @Args('registeredClassInput', { type: () => RegisteredClassInput })
    registeredClassInput: Partial<RegisteredClassInput>,
  ) {
    if (!registeredClassID) {
      this.logger.error('registeredClassUpdate mutation failed - registeredClassID is required')
      throw new BadRequestException('Registered class ID is required')
    }

    if (!registeredClassInput || Object.keys(registeredClassInput).length === 0) {
      this.logger.error('registeredClassUpdate mutation failed - registeredClassInput is required')
      throw new BadRequestException('Registered class input is required')
    }

    this.logger.log(`Updating registered class ID: ${registeredClassID}`)
    return await this.registeredClassService.update(
      registeredClassID,
      registeredClassInput,
    )
  }

  @Mutation(() => RegisteredClassPayload)
  async registeredClassDelete(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id'],
  ) {
    if (!registeredClassID) {
      this.logger.error('registeredClassDelete mutation failed - registeredClassID is required')
      throw new BadRequestException('Registered class ID is required')
    }

    this.logger.log(`Deleting registered class ID: ${registeredClassID}`)
    return await this.registeredClassService.remove(registeredClassID)
  }

  /** Field Resolvers */

  @ResolveField(() => [Selection])
  async selections(@Parent() registeredClass: tbl_reg_class) {
    if (!registeredClass?.id) {
      this.logger.error('selections field resolver failed - Invalid registeredClass or missing id')
      throw new BadRequestException('Invalid registered class')
    }

    this.logger.debug(`Fetching selections for registered class ID: ${registeredClass.id}`)

    const { id }: { id: RegisteredClass['id'] } = registeredClass
    const registeredClassID = id
    return await this.selectionService.findAll(registeredClassID)
  }

  @ResolveField(() => [Performer])
  async performers(@Parent() registeredClass: tbl_reg_class) {
    if (!registeredClass) {
      this.logger.error('performers field resolver failed - Invalid registeredClass')
      throw new BadRequestException('Invalid registered class')
    }

    const { classNumber }: { classNumber: RegisteredClass['classNumber'] }
      = registeredClass

    if (!classNumber) {
      this.logger.debug(`No classNumber for registered class ID: ${registeredClass.id}, returning empty array`)
      return []
    }

    this.logger.debug(`Fetching performers for registered class ID: ${registeredClass.id}, classNumber: ${classNumber}`)
    const registeredClassNumber = classNumber
    return await this.performerService.findAll(null, registeredClassNumber)
  }
}
