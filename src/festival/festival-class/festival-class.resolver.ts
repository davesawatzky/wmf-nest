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
import { tbl_class_type, tbl_classlist } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PerformerType } from '@/common.entity'
import { CategoryService } from '@/festival/category/category.service'
import { Category } from '@/festival/category/entities/category.entity'
import { ClassTypeService } from '@/festival/class-type/class-type.service'
import { ClassType } from '@/festival/class-type/entities/class-type.entity'
import { Level } from '@/festival/level/entities/level.entity'
import { LevelService } from '@/festival/level/level.service'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service'
import { Trophy } from '@/festival/trophy/entities/trophy.entity'
import {
  FestivalClassInput,
  FestivalClassSearchArgs,
} from './dto/festival-class.input'
import {
  FestivalClass,
  FestivalClassPayload,
} from './entities/festival-class.entity'
import { FestivalClassService } from './festival-class.service'

@Resolver(() => FestivalClass)
@UseGuards(JwtAuthGuard)
export class FestivalClassResolver {
  private readonly logger = new Logger(FestivalClassResolver.name)

  constructor(
    private festivalClassService: FestivalClassService,
    private subdisciplineService: SubdisciplineService,
    private levelService: LevelService,
    private categoryService: CategoryService,
    private classTypeService: ClassTypeService,
  ) {}

  /** Queries */

  @Query(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
    @Args('festivalClassSearch', {
      type: () => FestivalClassSearchArgs,
      nullable: true,
    })
    festivalClassSearch: FestivalClassSearchArgs | null,
  ) {
    this.logger.log(
      `Fetching festival classes with performerType: ${performerType}, search: ${JSON.stringify(festivalClassSearch)}`,
    )

    return await this.festivalClassService.findAll(
      performerType,
      festivalClassSearch?.subdisciplineID,
      festivalClassSearch?.levelID,
      festivalClassSearch?.categoryID,
    )
  }

  @Query(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClassSearch(
    @Args('festivalClassSearch', { type: () => FestivalClassSearchArgs })
    festivalClassSearch: FestivalClassSearchArgs,
  ) {
    // ✅ Input validation
    if (!festivalClassSearch) {
      this.logger.error('festivalClassSearch query failed - No search criteria provided')
      throw new BadRequestException('Search criteria are required')
    }

    this.logger.log(
      `Searching festival classes with criteria: ${JSON.stringify(festivalClassSearch)}`,
    )

    return await this.festivalClassService.search(festivalClassSearch)
  }

  @Query(() => FestivalClass)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClass(
    @Args('id', { type: () => Int }) id: FestivalClass['id'],
  ) {
    // ✅ Input validation
    if (!id) {
      this.logger.error('festivalClass query failed - No festival class ID provided')
      throw new BadRequestException('Festival class ID is required')
    }

    this.logger.log(`Fetching festival class with ID: ${id}`)
    return await this.festivalClassService.findById(id)
  }

  @Query(() => FestivalClass)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClassByNumber(
    @Args('festivalClassNumber', { type: () => String })
    festivalClassNumber: FestivalClass['classNumber'],
  ) {
    // ✅ Input validation
    if (!festivalClassNumber?.trim()) {
      this.logger.error('festivalClassByNumber query failed - No class number provided')
      throw new BadRequestException('Festival class number is required')
    }

    this.logger.log(`Fetching festival class with number: ${festivalClassNumber}`)
    return await this.festivalClassService.findByNumber(festivalClassNumber)
  }

  /** Mutations */

  @Mutation(() => FestivalClassPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: FestivalClass })
  async festivalClassCreate(
    @Args('festivalClassInput')
    festivalClassInput: FestivalClassInput,
  ) {
    if (!festivalClassInput) {
      this.logger.error('festivalClassCreate mutation failed - No input provided')
      throw new BadRequestException('Festival class input is required')
    }

    if (!festivalClassInput.classNumber?.trim()) {
      this.logger.error('festivalClassCreate mutation failed - Class number is required')
      throw new BadRequestException('Class number is required')
    }

    if (!festivalClassInput.performerType) {
      this.logger.error('festivalClassCreate mutation failed - Performer type is required')
      throw new BadRequestException('Performer type is required')
    }

    this.logger.log(`Creating festival class: ${festivalClassInput.classNumber}`)
    return await this.festivalClassService.create(festivalClassInput)
  }

  @Mutation(() => FestivalClassPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: FestivalClass })
  async festivalClassUpdate(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id'],
    @Args('festivalClassInput', { type: () => FestivalClassInput })
    festivalClassInput: FestivalClassInput,
  ) {
    if (!festivalClassID) {
      this.logger.error('festivalClassUpdate mutation failed - No festival class ID provided')
      throw new BadRequestException('Festival class ID is required')
    }

    if (!festivalClassInput) {
      this.logger.error('festivalClassUpdate mutation failed - No input provided')
      throw new BadRequestException('Festival class input is required')
    }

    if (festivalClassInput.classNumber !== undefined && !festivalClassInput.classNumber?.trim()) {
      this.logger.error('festivalClassUpdate mutation failed - Class number cannot be empty')
      throw new BadRequestException('Class number cannot be empty')
    }

    this.logger.log(`Updating festival class ID: ${festivalClassID}`)
    return await this.festivalClassService.update(
      festivalClassID,
      festivalClassInput,
    )
  }

  @Mutation(() => FestivalClassPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: FestivalClass })
  async festivalClassDelete(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id'],
  ) {
    if (!festivalClassID) {
      this.logger.error('festivalClassDelete mutation failed - No festival class ID provided')
      throw new BadRequestException('Festival class ID is required')
    }

    this.logger.log(`Deleting festival class ID: ${festivalClassID}`)
    return await this.festivalClassService.remove(festivalClassID)
  }

  /** Field Resolvers */

  @ResolveField(() => [Trophy])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async trophies(@Parent() festivalClass: FestivalClass) {
    if (!festivalClass?.classNumber) {
      this.logger.error('trophies field resolver failed - Invalid festival class parent')
      throw new BadRequestException('Invalid festival class')
    }

    this.logger.debug(`Fetching trophies for festival class: ${festivalClass.classNumber}`)

    const { classNumber }: { classNumber: FestivalClass['classNumber'] }
      = festivalClass
    return await this.festivalClassService.findClassTrophies(classNumber)
  }

  @ResolveField(() => Level)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async level(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.levelID) {
      this.logger.error('level field resolver failed - Invalid festival class or missing levelID')
      throw new BadRequestException('Invalid festival class')
    }

    this.logger.debug(`Fetching level for festival class ID: ${festivalClass.id}`)

    const { levelID }: { levelID: tbl_classlist['levelID'] } = festivalClass
    return await this.levelService.findOne(levelID)
  }

  @ResolveField(() => Subdiscipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subdiscipline })
  async subdiscipline(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.subdisciplineID) {
      this.logger.error('subdiscipline field resolver failed - Invalid festival class or missing subdisciplineID')
      throw new BadRequestException('Invalid festival class')
    }

    this.logger.debug(`Fetching subdiscipline for festival class ID: ${festivalClass.id}`)

    const {
      subdisciplineID,
    }: { subdisciplineID: tbl_classlist['subdisciplineID'] } = festivalClass
    return await this.subdisciplineService.findOne(subdisciplineID)
  }

  @ResolveField(() => Category)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Category })
  async category(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.categoryID) {
      this.logger.error('category field resolver failed - Invalid festival class or missing categoryID')
      throw new BadRequestException('Invalid festival class')
    }

    this.logger.debug(`Fetching category for festival class ID: ${festivalClass.id}`)

    const { categoryID }: { categoryID: tbl_classlist['categoryID'] }
      = festivalClass
    return await this.categoryService.findOne(categoryID)
  }

  @ResolveField(() => ClassType)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ClassType })
  async classType(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.classTypeID) {
      this.logger.error('classType field resolver failed - Invalid festival class or missing classTypeID')
      throw new BadRequestException('Invalid festival class')
    }

    this.logger.debug(`Fetching class type for festival class ID: ${festivalClass.id}`)

    const { classTypeID }: { classTypeID: tbl_class_type['id'] }
      = festivalClass
    return await this.classTypeService.findOne(classTypeID)
  }
}
