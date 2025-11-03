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
import { FestivalClassDataLoader } from './festival-class.dataloader'
import { FestivalClassService } from './festival-class.service'

@Resolver(() => FestivalClass)
@UseGuards(JwtAuthGuard)
export class FestivalClassResolver {
  private readonly logger = new Logger(FestivalClassResolver.name)

  constructor(
    private festivalClassService: FestivalClassService,
    private festivalClassDataLoader: FestivalClassDataLoader,
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
    this.logger.log(`Deleting festival class ID: ${festivalClassID}`)
    return await this.festivalClassService.remove(festivalClassID)
  }

  /** Field Resolvers */

  @ResolveField(() => [Trophy], { nullable: true })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async trophies(@Parent() festivalClass: FestivalClass) {
    if (!festivalClass?.classNumber) {
      this.logger.warn('trophies field resolver - missing classNumber')
      return null
    }

    this.logger.debug(`Fetching trophies for festival class: ${festivalClass.classNumber}`)

    // Use DataLoader to batch trophy queries
    return await this.festivalClassDataLoader.trophiesLoader.load(festivalClass.classNumber)
  }

  @ResolveField(() => Level, { nullable: true })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async level(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.levelID) {
      this.logger.warn('level field resolver - missing levelID')
      return null
    }

    this.logger.debug(`Fetching level for festival class ID: ${festivalClass.id}`)

    // Use DataLoader to batch level queries
    return await this.festivalClassDataLoader.levelLoader.load(festivalClass.levelID)
  }

  @ResolveField(() => Subdiscipline, { nullable: true })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subdiscipline })
  async subdiscipline(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.subdisciplineID) {
      this.logger.warn('subdiscipline field resolver - missing subdisciplineID')
      return null
    }

    this.logger.debug(`Fetching subdiscipline for festival class ID: ${festivalClass.id}`)

    // Use DataLoader to batch subdiscipline queries
    return await this.festivalClassDataLoader.subdisciplineLoader.load(festivalClass.subdisciplineID)
  }

  @ResolveField(() => Category, { nullable: true })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Category })
  async category(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.categoryID) {
      this.logger.warn('category field resolver - missing categoryID')
      return null
    }

    this.logger.debug(`Fetching category for festival class ID: ${festivalClass.id}`)

    // Use DataLoader to batch category queries
    return await this.festivalClassDataLoader.categoryLoader.load(festivalClass.categoryID)
  }

  @ResolveField(() => ClassType, { nullable: true })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ClassType })
  async classType(@Parent() festivalClass: tbl_classlist) {
    if (!festivalClass?.classTypeID) {
      this.logger.warn('classType field resolver - missing classTypeID')
      return null
    }

    this.logger.debug(`Fetching class type for festival class ID: ${festivalClass.id}`)

    // Use DataLoader to batch class type queries
    return await this.festivalClassDataLoader.classTypeLoader.load(festivalClass.classTypeID)
  }
}
