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
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PerformerType } from '@/common.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { LevelInput } from './dto/level.input'
import { Level, LevelPayload } from './entities/level.entity'
import { LevelService } from './level.service'

@Resolver(() => Level)
@UseGuards(JwtAuthGuard)
export class LevelResolver {
  private readonly logger = new Logger(LevelResolver.name)

  constructor(
    private readonly levelService: LevelService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query(() => [Level])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async levels(
    @Args('categoryID', { type: () => Int, nullable: true })
    categoryID: tbl_category['id'] | null,
    @Args('subdisciplineID', { type: () => Int, nullable: true })
    subdisciplineID: tbl_subdiscipline['id'] | null,
  ) {
    this.logger.log(
      `Fetching levels with filters - categoryID: ${categoryID}, subdisciplineID: ${subdisciplineID}`,
    )
    return await this.levelService.findAll(categoryID, subdisciplineID)
  }

  @Query(() => Level)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async level(@Args('id', { type: () => Int }) id: Level['id']) {
    if (!id) {
      this.logger.error('level query failed - No level ID provided')
      throw new BadRequestException('Level ID is required')
    }

    this.logger.log(`Fetching level with ID: ${id}`)
    return await this.levelService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Level })
  async levelCreate(@Args('levelInput') levelInput: LevelInput) {
    if (!levelInput) {
      this.logger.error('levelCreate mutation failed - No input provided')
      throw new BadRequestException('Level input is required')
    }

    if (!levelInput.name?.trim()) {
      this.logger.error('levelCreate mutation failed - Name is required')
      throw new BadRequestException('Level name is required')
    }

    this.logger.log(`Creating level: ${levelInput.name}`)
    return await this.levelService.create(levelInput)
  }

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Level })
  async levelUpdate(
    @Args('levelID', { type: () => Int }) levelID: Level['id'],
    @Args('levelInput') levelInput: LevelInput,
  ) {
    if (!levelID) {
      this.logger.error('levelUpdate mutation failed - No level ID provided')
      throw new BadRequestException('Level ID is required')
    }

    if (!levelInput) {
      this.logger.error('levelUpdate mutation failed - No input provided')
      throw new BadRequestException('Level input is required')
    }

    if (levelInput.name !== undefined && !levelInput.name?.trim()) {
      this.logger.error('levelUpdate mutation failed - Name cannot be empty')
      throw new BadRequestException('Level name cannot be empty')
    }

    this.logger.log(`Updating level ID: ${levelID}`)
    return await this.levelService.update(levelID, levelInput)
  }

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Level })
  async levelDelete(
    @Args('levelID', { type: () => Int }) levelID: Level['id'],
  ) {
    if (!levelID) {
      this.logger.error('levelDelete mutation failed - No level ID provided')
      throw new BadRequestException('Level ID is required')
    }

    this.logger.log(`Deleting level ID: ${levelID}`)
    return await this.levelService.remove(levelID)
  }

  /** Field Resolver */

  @ResolveField(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(
    @Parent() level: tbl_level,
    @Args('performerType', { type: () => PerformerType })
    performerType: PerformerType,
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: tbl_subdiscipline['id'],
    @Args('categoryID', { type: () => Int }) categoryID: tbl_category['id'],
  ) {
    if (!level?.id) {
      this.logger.error('festivalClasses field resolver failed - Invalid level parent')
      throw new BadRequestException('Invalid level')
    }

    if (!performerType) {
      this.logger.error('festivalClasses field resolver failed - Performer type is required')
      throw new BadRequestException('Performer type is required')
    }

    if (!subdisciplineID) {
      this.logger.error('festivalClasses field resolver failed - Subdiscipline ID is required')
      throw new BadRequestException('Subdiscipline ID is required')
    }

    if (!categoryID) {
      this.logger.error('festivalClasses field resolver failed - Category ID is required')
      throw new BadRequestException('Category ID is required')
    }

    this.logger.debug(
      `Fetching festival classes for level ID: ${level.id} with filters - performerType: ${performerType}, subdisciplineID: ${subdisciplineID}, categoryID: ${categoryID}`,
    )

    const levelID = level.id
    return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }
}
