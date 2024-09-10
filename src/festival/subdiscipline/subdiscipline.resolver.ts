import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PerformerType } from '@/common.entity'
import { CategoryService } from '@/festival/category/category.service'
import { Category } from '@/festival/category/entities/category.entity'
import { DisciplineService } from '@/festival/discipline/discipline.service'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { Level } from '@/festival/level/entities/level.entity'
import { LevelService } from '@/festival/level/level.service'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
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
import { SubdisciplineInput } from './dto/subdiscipline.input'
import {
  Subdiscipline,
  SubdisciplinePayload,
} from './entities/subdiscipline.entity'
import { SubdisciplineService } from './subdiscipline.service'

@Resolver(() => Subdiscipline)
@UseGuards(JwtAuthGuard)
export class SubdisciplineResolver {
  constructor(
    private readonly subdisciplineService: SubdisciplineService,
    private readonly categoryService: CategoryService,
    private readonly levelService: LevelService,
    private readonly festivalClassService: FestivalClassService,
    private readonly disciplineService: DisciplineService,
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
    return await this.subdisciplineService.findAll(disciplineID, performerType)
  }

  @Query(() => Subdiscipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subdiscipline })
  async subdiscipline(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
  ) {
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
    let response: any
    try {
      response = await this.subdisciplineService.create(subdisciplineInput,
      )
    }
    catch (error) {
      throw new HttpException('Could not create subdiscipline', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
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
    let response: any
    try {
      response = await this.subdisciplineService.update(
        subdisciplineID,
        subdisciplineInput,
      )
    }
    catch (error) {
      throw new HttpException('Subdiscipline to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => SubdisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Subdiscipline })
  async subdisciplineDelete(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
  ) {
    let response: any
    try {
      response = await this.subdisciplineService.remove(subdisciplineID)
    }
    catch (error) {
      throw new HttpException('Subdiscipline to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
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
  async categories(
    @Parent() subdiscipline: tbl_subdiscipline,
  ) {
    const subdisciplineID = subdiscipline.id
    return await this.categoryService.findAll(undefined, subdisciplineID)
  }

  @ResolveField(() => [Level])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async levels(
    @Parent() subdiscipline: tbl_subdiscipline,
  ) {
    const subdisciplineID = subdiscipline.id
    return await this.levelService.findAll(undefined, subdisciplineID)
  }

  @ResolveField(() => Discipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Discipline })
  async discipline(
    @Parent() subdiscipline: tbl_subdiscipline,
  ) {
    const disciplineID = subdiscipline.disciplineID
    return await this.disciplineService.findOne(disciplineID)
  }
}
