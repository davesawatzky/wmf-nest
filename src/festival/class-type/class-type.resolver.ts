import { BadRequestException, Logger, UseGuards } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { tbl_class_type } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { ClassTypeService } from './class-type.service'
import { ClassTypeInput } from './dto/class-type.input'
import { ClassType, ClassTypePayload } from './entities/class-type.entity'

@Resolver(() => ClassType)
@UseGuards(JwtAuthGuard)
export class ClassTypeResolver {
  private readonly logger = new Logger(ClassTypeResolver.name)

  constructor(
    private readonly classTypeService: ClassTypeService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query(() => [ClassType])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ClassType })
  async classTypes() {
    this.logger.log('Fetching all class types')
    return await this.classTypeService.findAll()
  }

  @Query(() => ClassType)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ClassType })
  async classType(@Args('id', { type: () => Int }) id: ClassType['id']) {
    if (!id) {
      this.logger.error('classType query failed - No class type ID was provided')
      throw new BadRequestException('Class type ID is required')
    }
    this.logger.log(`Fetching class type with ID: ${id}`)
    return await this.classTypeService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => ClassTypePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: ClassType })
  async classTypeCreate(
    @Args('classTypeInput') classTypeInput: ClassTypeInput,
  ) {
    if (!classTypeInput) {
      this.logger.error('classTypeCreate mutation failed - No input provided')
      throw new BadRequestException('Class type input is required')
    }
    if (!classTypeInput.name?.trim()) {
      this.logger.error('classTypeCreate mutation failed - Name is required')
      throw new BadRequestException('Class type name is required')
    }
    this.logger.log(`Creating class type: ${classTypeInput.name}`)
    return await this.classTypeService.create(classTypeInput)
  }

  @Mutation(() => ClassTypePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: ClassType })
  async classTypeUpdate(
    @Args('classTypeID', { type: () => Int }) classTypeID: ClassType['id'],
    @Args('classTypeInput') classTypeInput: ClassTypeInput,
  ) {
    if (!classTypeID) {
      this.logger.error('classTypeUpdate mutation failed - No class type ID provided')
      throw new BadRequestException('Class type ID is required')
    }
    if (!classTypeInput) {
      this.logger.error('classTypeUpdate mutation failed - No input provided')
      throw new BadRequestException('Class type input is required')
    }
    if (classTypeInput.name !== undefined && !classTypeInput.name?.trim()) {
      this.logger.error('classTypeUpdate mutation failed - Name cannot be empty')
      throw new BadRequestException('Class type name cannot be empty')
    }
    this.logger.log(`Updating class type ID: ${classTypeID}`)
    return await this.classTypeService.update(classTypeID, classTypeInput)
  }

  @Mutation(() => ClassTypePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: ClassType })
  async classTypeDelete(
    @Args('classTypeID', { type: () => Int }) classTypeID: ClassType['id'],
  ) {
    if (!classTypeID) {
      this.logger.error('classTypeDelete mutation failed - No class type ID provided')
      throw new BadRequestException('Class type ID is required')
    }
    this.logger.log(`Deleting class type ID: ${classTypeID}`)
    return await this.classTypeService.remove(classTypeID)
  }

  /** Field Resolvers */
  @ResolveField(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(@Parent() classType: tbl_class_type) {
    if (!classType?.id) {
      this.logger.error('festivalClasses field resolver failed - Invalid class type parent')
      throw new BadRequestException('Invalid class type')
    }
    this.logger.debug(`Fetching festival classes for class type ID: ${classType.id}`)
    const classTypeID = classType.id
    return await this.festivalClassService.findAll(
      undefined,
      undefined,
      undefined,
      undefined,
      classTypeID,
    )
  }
}
