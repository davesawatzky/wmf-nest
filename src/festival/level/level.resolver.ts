import { Resolver, ResolveField, Parent, Query, Mutation, Args, Int, registerEnumType } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { LevelService } from './level.service'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { Level, LevelPayload } from './entities/level.entity'
import { LevelInput } from './dto/level.input'
import { FestivalClassService } from '../festival-class/festival-class.service'
import { PerformerType } from 'src/common.entity'

registerEnumType(PerformerType, {
  name: 'PerformerType',
  description: 'SOLO, GROUP, SCHOOL, COMMUNITY',
})
@Resolver(() => Level)
@UseGuards(JwtAuthGuard)
export class LevelResolver {
  constructor(
    private readonly levelService: LevelService,
    private readonly festivalClassService: FestivalClassService
  ) {}

  /** Queries */

  @Query(() => [Level])
  async levels(
    @Args('categoryID', { type: () => Int }) categoryID: tbl_category['id'],
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: tbl_subdiscipline['id']
  ) {
    return this.levelService.findAll(categoryID, subdisciplineID)
  }

  @Query(() => Level)
  async level(@Args('id', { type: () => Int }) id: Level['id']) {
    return this.levelService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => LevelPayload)
  async levelCreate(@Args('levelInput') levelInput: LevelInput) {
    return this.levelService.create(levelInput)
  }

  @Mutation(() => LevelPayload)
  async levelUpdate(
    @Args('levelID', { type: () => Int }) levelID: Level['id'],
    @Args('levelInput') levelInput: LevelInput
  ) {
    return this.levelService.update(levelID, levelInput)
  }

  @Mutation(() => LevelPayload)
  async levelDelete(@Args('levelID', { type: () => Int }) levelID: Level['id']) {
    return this.levelService.remove(levelID)
  }

  /** Field Resolver */

  @ResolveField()
  classes(
    @Parent() { id }: tbl_level,
    @Args('performerType') performerType: PerformerType,
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: tbl_subdiscipline['id'],
    @Args('categoryID', { type: () => Int }) categoryID: tbl_category['id']
  ) {
    const levelID = id
    return this.festivalClassService.findAll(performerType, subdisciplineID, levelID, categoryID)
  }
}
