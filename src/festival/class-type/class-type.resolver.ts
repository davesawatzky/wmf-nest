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
import { ClassTypeDataLoader } from './class-type.dataloader'
import { ClassTypeService } from './class-type.service'
import { ClassTypeInput } from './dto/class-type.input'
import { ClassType, ClassTypePayload } from './entities/class-type.entity'

@Resolver(() => ClassType)
@UseGuards(JwtAuthGuard)
export class ClassTypeResolver {
  private readonly logger = new Logger(ClassTypeResolver.name)

  constructor(
    private readonly classTypeService: ClassTypeService,
    private readonly classTypeDataLoader: ClassTypeDataLoader,
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
    this.logger.log(`Updating class type ID: ${classTypeID}`)
    return await this.classTypeService.update(classTypeID, classTypeInput)
  }

  @Mutation(() => ClassTypePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: ClassType })
  async classTypeDelete(
    @Args('classTypeID', { type: () => Int }) classTypeID: ClassType['id'],
  ) {
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
      return null
    }
    this.logger.debug(`Fetching festival classes for class type ID: ${classType.id}`)
    // Use DataLoader to batch festival class queries
    return await this.classTypeDataLoader.festivalClassesLoader.load(classType.id)
  }
}
