import {
  Resolver,
  ResolveField,
  Query,
  Mutation,
  Args,
  Parent,
  Int,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { FestivalClassService } from './festival-class.service'
import { FestivalClassInput } from './dto/festival-class.input'
import { FestivalClassSearchArgs } from './dto/festival-class.input'
import {
  FestivalClass,
  FestivalClassPayload,
} from './entities/festival-class.entity'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PerformerType } from '../../common.entity'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { LevelService } from '../level/level.service'
import { CategoryService } from '../category/category.service'
import { tbl_classlist } from '@prisma/client'

@Resolver(() => FestivalClass)
@UseGuards(JwtAuthGuard)
export class FestivalClassResolver {
  constructor(
    private festivalClassService: FestivalClassService,
    private subdisciplineService: SubdisciplineService,
    private levelService: LevelService,
    private categoryService: CategoryService
  ) {}

  /** Queries */

  @Query(() => [FestivalClass])
  async festivalClasses(
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType,
    @Args('festivalClassSearch', {
      type: () => FestivalClassSearchArgs,
      nullable: true,
    })
    festivalClassSearch: FestivalClassSearchArgs
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
    @Args('performerType') performerType: PerformerType,
    @Args('festivalClass')
    festivalClass: FestivalClassInput
  ) {
    return await this.festivalClassService.create(performerType, festivalClass)
  }

  @Mutation(() => FestivalClassPayload)
  async festivalClassUpdate(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id'],
    @Args('festivalClass', { type: () => FestivalClassInput })
    festivalClass: Partial<FestivalClassInput>
  ) {
    return await this.festivalClassService.update(
      festivalClassID,
      festivalClass
    )
  }

  @Mutation(() => FestivalClassPayload)
  async festivalClassDelete(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id']
  ) {
    return await this.festivalClassService.remove(festivalClassID)
  }

  /** Field Resolvers */

  @ResolveField()
  async trophies(@Parent() festivalClass: FestivalClass) {
    const { id }: { id: FestivalClass['id'] } = festivalClass
    return await this.festivalClassService.findClassTrophies(id)
  }

  @ResolveField()
  async level(@Parent() festivalClass: tbl_classlist) {
    const { levelID }: { levelID: tbl_classlist['levelID'] } = festivalClass
    return await this.levelService.findOne(levelID)
  }
  @ResolveField()
  async subdiscipline(@Parent() festivalClass: tbl_classlist) {
    const {
      subdisciplineID,
    }: { subdisciplineID: tbl_classlist['subdisciplineID'] } = festivalClass
    return await this.subdisciplineService.findOne(subdisciplineID)
  }
  @ResolveField()
  async category(@Parent() festivalClass: tbl_classlist) {
    const { categoryID }: { categoryID: tbl_classlist['categoryID'] } =
      festivalClass
    return await this.categoryService.findOne(categoryID)
  }
}
