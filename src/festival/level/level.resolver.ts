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
    this.logger.log(`Fetching level with ID: ${id}`)
    return await this.levelService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Level })
  async levelCreate(@Args('levelInput') levelInput: LevelInput) {
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
    this.logger.log(`Updating level ID: ${levelID}`)
    return await this.levelService.update(levelID, levelInput)
  }

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Level })
  async levelDelete(
    @Args('levelID', { type: () => Int }) levelID: Level['id'],
  ) {
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
