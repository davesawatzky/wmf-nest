import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { LevelService } from './level.service'
import { Level, LevelPayload } from './entities/level.entity'
import { LevelInput } from './dto/level.input'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { PerformerType } from '@/common.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { Action } from '@/ability/ability.factory'

@Resolver(() => Level)
@UseGuards(JwtAuthGuard)
export class LevelResolver {
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
    return await this.levelService.findAll(categoryID, subdisciplineID)
  }

  @Query(() => Level)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async level(@Args('id', { type: () => Int }) id: Level['id']) {
    return await this.levelService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Level })
  async levelCreate(@Args('levelInput') levelInput: LevelInput) {
    let response: any
    try {
      response = await this.levelService.create(levelInput)
    }
    catch (error) {
      throw new HttpException('Could not create level', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Level })
  async levelUpdate(
    @Args('levelID', { type: () => Int }) levelID: Level['id'],
    @Args('levelInput') levelInput: LevelInput,
  ) {
    let response: any
    try {
      response = await this.levelService.update(levelID, levelInput)
    }
    catch (error) {
      throw new HttpException('Level to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => LevelPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Level })
  async levelDelete(
    @Args('levelID', { type: () => Int }) levelID: Level['id'],
  ) {
    let response: any
    try {
      response = await this.levelService.remove(levelID)
    }
    catch (error) {
      throw new HttpException('Level to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
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
    const levelID = level.id
    return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }
}
