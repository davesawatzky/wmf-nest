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
import {
  tbl_category,
  tbl_discipline,
  tbl_level,
  tbl_subdiscipline,
} from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PerformerType } from '@/common.entity'
import { Category } from '@/festival/category/entities/category.entity'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { Level } from '@/festival/level/entities/level.entity'
import { SubdisciplineInput } from './dto/subdiscipline.input'
import {
  Subdiscipline,
  SubdisciplinePayload,
} from './entities/subdiscipline.entity'
import { SubdisciplineDataLoader } from './subdiscipline.dataloader'
import { SubdisciplineService } from './subdiscipline.service'

@Resolver(() => Subdiscipline)
@UseGuards(JwtAuthGuard)
export class SubdisciplineResolver {
  private readonly logger = new Logger(SubdisciplineResolver.name)

  constructor(
    private readonly subdisciplineService: SubdisciplineService,
    private readonly subdisciplineDataLoader: SubdisciplineDataLoader,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query(() => [Subdiscipline])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subdiscipline })
  async subdisciplines(
    @Args('disciplineID', { type: () => Int, nullable: true })
    disciplineID: tbl_discipline['id'] | null,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
  ) {
    this.logger.log(
      `Fetching subdisciplines with filters - disciplineID: ${disciplineID}, performerType: ${performerType}`,
    )
    return await this.subdisciplineService.findAll(disciplineID, performerType)
  }

  @Query(() => Subdiscipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subdiscipline })
  async subdiscipline(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
  ) {
    this.logger.log(`Fetching subdiscipline with ID: ${subdisciplineID}`)
    return await this.subdisciplineService.findOne(subdisciplineID)
  }

  /** Mutations */

  @Mutation(() => SubdisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Subdiscipline })
  async subdisciplineCreate(
    @Args('subdisciplineInput')
    subdisciplineInput: SubdisciplineInput,
  ): Promise<SubdisciplinePayload> {
    this.logger.log(`Creating subdiscipline: ${subdisciplineInput.name}`)
    return await this.subdisciplineService.create(subdisciplineInput)
  }

  @Mutation(() => SubdisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Subdiscipline })
  async subdisciplineUpdate(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
    @Args('subdisciplineInput', { type: () => SubdisciplineInput })
    subdisciplineInput: SubdisciplineInput,
  ) {
    this.logger.log(`Updating subdiscipline ID: ${subdisciplineID}`)
    return await this.subdisciplineService.update(
      subdisciplineID,
      subdisciplineInput,
    )
  }

  @Mutation(() => SubdisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Subdiscipline })
  async subdisciplineDelete(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
  ) {
    this.logger.log(`Deleting subdiscipline ID: ${subdisciplineID}`)
    return await this.subdisciplineService.remove(subdisciplineID)
  }

  /** Field Resolvers */

  @ResolveField(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(
    @Parent() subdiscipline: tbl_subdiscipline,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
    @Args('levelID', { type: () => Int, nullable: true })
    levelID: tbl_level['id'] | null,
    @Args('categoryID', { type: () => Int, nullable: true })
    categoryID: tbl_category['id'] | null,
  ) {
    if (!subdiscipline?.id) {
      this.logger.error('festivalClasses field resolver failed - Invalid subdiscipline parent')
      return null
    }
    this.logger.debug(
      `Fetching festival classes for subdiscipline ID: ${subdiscipline.id} with filters - performerType: ${performerType}, levelID: ${levelID}, categoryID: ${categoryID}`,
    )
    const subdisciplineID = subdiscipline.id
    return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }

  @ResolveField(() => [Category])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Category })
  async categories(@Parent() subdiscipline: tbl_subdiscipline) {
    if (!subdiscipline?.id) {
      this.logger.warn('categories field resolver - missing id')
      return null
    }
    // Use DataLoader to batch category queries
    return await this.subdisciplineDataLoader.categoriesLoader.load(subdiscipline.id)
  }

  @ResolveField(() => [Level])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async levels(@Parent() subdiscipline: tbl_subdiscipline) {
    if (!subdiscipline?.id) {
      this.logger.warn('levels field resolver - missing id')
      return null
    }
    // Use DataLoader to batch level queries
    return await this.subdisciplineDataLoader.levelsLoader.load(subdiscipline.id)
  }

  @ResolveField(() => Discipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Discipline })
  async discipline(@Parent() subdiscipline: tbl_subdiscipline) {
    if (!subdiscipline?.disciplineID) {
      this.logger.warn('discipline field resolver - missing disciplineID')
      return null
    }
    // Use DataLoader to batch discipline queries
    return await this.subdisciplineDataLoader.disciplineLoader.load(subdiscipline.disciplineID)
  }
}
