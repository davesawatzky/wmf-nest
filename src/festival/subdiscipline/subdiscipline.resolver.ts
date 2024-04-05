import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { SubdisciplineService } from './subdiscipline.service'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PerformerType } from '../../common.entity'
import {
  tbl_discipline,
  tbl_category,
  tbl_level,
  tbl_subdiscipline,
} from '@prisma/client'
import { FestivalClassService } from '../festival-class/festival-class.service'
import {
  Subdiscipline,
  SubdisciplinePayload,
} from './entities/subdiscipline.entity'
import { SubdisciplineInput } from './dto/subdiscipline.input'
import { FestivalClass } from '../festival-class/entities/festival-class.entity'
import {CategoryService} from '../category/category.service'
import {LevelService} from '../level/level.service'
import {Category} from '../category/entities/category.entity'
import {Level} from '../level/entities/level.entity'
import {Discipline} from '../discipline/entities/discipline.entity'
import {DisciplineService} from '../discipline/discipline.service'

@Resolver(() => Subdiscipline)
@UseGuards(JwtAuthGuard)
export class SubdisciplineResolver {
  constructor(
    private readonly subdisciplineService: SubdisciplineService,
    private readonly categoryService: CategoryService,
    private readonly levelService: LevelService,
    private readonly festivalClassService: FestivalClassService,
    private readonly disciplineService: DisciplineService
  ) {}

  /** Queries */

  @Query(() => [Subdiscipline])
  async subdisciplines(
    @Args('disciplineID', { type: () => Int, nullable: true })
    disciplineID: tbl_discipline['id'] | null,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null
  ) {
    return await this.subdisciplineService.findAll(disciplineID, performerType)
  }

  @Query(() => Subdiscipline)
  async subdiscipline(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id']
  ) {
    return await this.subdisciplineService.findOne(subdisciplineID)
  }


  /** Mutations */

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineCreate(
    @Args('subdisciplineInput')
    subdisciplineInput: SubdisciplineInput
  ) {
    let response: SubdisciplinePayload
    try {
      response = await this.subdisciplineService.create(
        subdisciplineInput
      )
    } catch (error) {
      throw new HttpException('Could not create subdiscipline', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }
  
  @Mutation(() => SubdisciplinePayload)
  async subdisciplineUpdate(
    @Args('subdisciplineID', {type: () => Int})
    subdisciplineID: Subdiscipline['id'],
    @Args('subdisciplineInput', {type: () => SubdisciplineInput})
    subdisciplineInput: SubdisciplineInput
  ) {
    let response: SubdisciplinePayload
    try {
      response = await this.subdisciplineService.update(
        subdisciplineID,
        subdisciplineInput
      )
    } catch (error) {
      throw new HttpException('Subdiscipline to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineDelete(
    @Args('subdisciplineID', {type: () => Int})
    subdisciplineID: Subdiscipline['id']
  ) {
    let response: SubdisciplinePayload
    try {
      response = await this.subdisciplineService.remove(subdisciplineID)
    } catch (error) {
      throw new HttpException('Subdiscipline to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  /** Field Resolvers */

  @ResolveField(() => [FestivalClass])
  async festivalClasses(
    @Parent() subdiscipline: tbl_subdiscipline,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
    @Args('levelID', { type: () => Int, nullable: true })
    levelID: tbl_level['id'] | null,
    @Args('categoryID', { type: () => Int, nullable: true })
    categoryID: tbl_category['id'] | null
  ) {
    const subdisciplineID = subdiscipline.id
    return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID
    )
  }

  @ResolveField(() => [Category])
  async categories(
    @Parent() subdiscipline: tbl_subdiscipline,
  ) {
    const subdisciplineID = subdiscipline.id
    return await this.categoryService.findAll(undefined, subdisciplineID)
  }

  @ResolveField(() => [Level])
  async levels(
    @Parent() subdiscipline:tbl_subdiscipline,
  ) {
    const subdisciplineID = subdiscipline.id
    return await this.levelService.findAll(undefined, subdisciplineID)
  }

  @ResolveField(() => Discipline)
  async discipline(
    @Parent() subdiscipline: tbl_subdiscipline,
  ) {
    const disciplineID = subdiscipline.disciplineID
    return await this.disciplineService.findOne(disciplineID)
  }
}
