import {
  Resolver,
  ResolveField,
  Query,
  Mutation,
  Args,
  Parent,
  Int,
} from '@nestjs/graphql'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { FestivalClassService } from './festival-class.service'
import { FestivalClassInput } from './dto/festival-class.input'
import { FestivalClassSearchArgs } from './dto/festival-class.input'
import {
  FestivalClass,
  FestivalClassPayload,
} from './entities/festival-class.entity'
import { PerformerType } from '../../common.entity'
import { ClassType } from '../class-type/entities/class-type.entity'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { LevelService } from '../level/level.service'
import { ClassTypeService } from '../class-type/class-type.service'
import { CategoryService } from '../category/category.service'
import { tbl_class_type, tbl_classlist } from '@prisma/client'
import { Trophy } from '../trophy/entities/trophy.entity'
import { Level } from '../level/entities/level.entity'
import { Subdiscipline } from '../subdiscipline/entities/subdiscipline.entity'
import { Category } from '../category/entities/category.entity'

@Resolver(() => FestivalClass)
@UseGuards(JwtAuthGuard)
export class FestivalClassResolver {
  constructor(
    private festivalClassService: FestivalClassService,
    private subdisciplineService: SubdisciplineService,
    private levelService: LevelService,
    private categoryService: CategoryService,
    private classTypeService: ClassTypeService
  ) {}

  /** Queries */

  @Query(() => [FestivalClass])
  async festivalClasses(
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
    @Args('festivalClassSearch', {
      type: () => FestivalClassSearchArgs,
      nullable: true,
    })
    festivalClassSearch: FestivalClassSearchArgs | null
  ) {
    const { subdisciplineID, categoryID, levelID } = festivalClassSearch
    return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID
    )
  }

  @Query(() => [FestivalClass])
  async festivalClassSearch(
    @Args('festivalClassSearch', { type: () => FestivalClassSearchArgs })
    festivalClassSearch: FestivalClassSearchArgs
  ) {
    return await this.festivalClassService.search(festivalClassSearch)
  }

  @Query(() => FestivalClass)
  async festivalClass(
    @Args('id', { type: () => Int }) id: FestivalClass['id']
  ) {
    return await this.festivalClassService.findById(id)
  }

  @Query(() => FestivalClass)
  async festivalClassByNumber(
    @Args('festivalClassNumber', { type: () => String })
    festivalClassNumber: FestivalClass['classNumber']
  ) {
    return await this.festivalClassService.findByNumber(festivalClassNumber)
  }

  /** Mutations */

  @Mutation(() => FestivalClassPayload)
  async festivalClassCreate(
    @Args('festivalClassInput')
    festivalClassInput: FestivalClassInput
  ) {
    let response: any
    try {
      response = await this.festivalClassService.create(festivalClassInput)
    } catch (error) {
      throw new HttpException('Could not create festival class', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => FestivalClassPayload)
  async festivalClassUpdate(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id'],
    @Args('festivalClassInput', { type: () => FestivalClassInput })
    festivalClassInput: FestivalClassInput
  ){
    let response: any
    try {
      response = await this.festivalClassService.update(
        festivalClassID,
        festivalClassInput
      )
    } catch (error) {
      throw new HttpException('Could not update festival class', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => FestivalClassPayload)
  async festivalClassDelete(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id']
  ) {
    return await this.festivalClassService.remove(festivalClassID)
  }

  /** Field Resolvers */

  @ResolveField(() => [Trophy])
  async trophies(@Parent() festivalClass: FestivalClass) {
    const { classNumber }: { classNumber: FestivalClass['classNumber'] } =
      festivalClass
    return await this.festivalClassService.findClassTrophies(classNumber)
  }

  @ResolveField(() => Level)
  async level(@Parent() festivalClass: tbl_classlist) {
    const { levelID }: { levelID: tbl_classlist['levelID'] } = festivalClass
    return await this.levelService.findOne(levelID)
  }
  @ResolveField(() => Subdiscipline)
  async subdiscipline(@Parent() festivalClass: tbl_classlist) {
    const {
      subdisciplineID,
    }: { subdisciplineID: tbl_classlist['subdisciplineID'] } = festivalClass
    return await this.subdisciplineService.findOne(subdisciplineID)
  }
  @ResolveField(() => Category)
  async category(@Parent() festivalClass: tbl_classlist) {
    const { categoryID }: { categoryID: tbl_classlist['categoryID'] } =
      festivalClass
    return await this.categoryService.findOne(categoryID)
  }
  @ResolveField(() => ClassType)
  async classType(@Parent() festivalClass: tbl_classlist) {
    const { classTypeID }: { classTypeID: tbl_class_type['id'] } = festivalClass
    return await this.classTypeService.findOne(classTypeID)
  }
}
