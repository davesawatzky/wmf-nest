import {
  Resolver,
  ResolveField,
  Query,
  Mutation,
  Args,
  Parent,
} from '@nestjs/graphql'
import { FestivalClassService } from './festival-class.service'
import {
  FestivalClassInput,
  FestivalClassSearchArgs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SGSlabel,
} from 'src/graphql'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { LevelService } from '../level/level.service'
import { CategoryService } from '../category/category.service'
import { tbl_classlist } from '@prisma/client'
// import { CreateFestivalClassInput } from './dto/create-festival-class.input'
// import { UpdateFestivalClassInput } from './dto/update-festival-class.input'

@Resolver('FestivalClass')
export class FestivalClassResolver {
  constructor(
    private festivalClassService: FestivalClassService,
    private subdisciplineService: SubdisciplineService,
    private levelService: LevelService,
    private categoryService: CategoryService,
  ) {}

  /** Queries */

  @Query('festivalClasses')
  findAll(@Args('SGSlabel') SGSlabel: SGSlabel) {
    return this.festivalClassService.findAll(SGSlabel)
  }

  @Query('festivalClassSearch')
  search(
    @Args('festivalClassSearch')
    festivalClassSearch: FestivalClassSearchArgs,
  ) {
    return this.festivalClassService.search(festivalClassSearch)
  }

  @Query('festivalClass')
  findById(@Args('id') id: tbl_classlist['id']) {
    return this.festivalClassService.findById(id)
  }

  @Query('festivalClassByNumber')
  findByNumber(
    @Args('festivalClassNumber')
    festivalClassNumber: tbl_classlist['classNumber'],
  ) {
    return this.festivalClassService.findByNumber(festivalClassNumber)
  }

  /** Mutations */

  @Mutation('createFestivalClass')
  create(
    @Args('SGSlabel') SGSlabel: SGSlabel,
    @Args('festivalClass')
    festivalClass: FestivalClassInput,
  ) {
    return this.festivalClassService.create(SGSlabel, festivalClass)
  }

  @Mutation('updateFestivalClass')
  update(
    @Args('festivalClassID') festivalClassID: tbl_classlist['id'],
    @Args('festivalClass') festivalClass: FestivalClassInput,
  ) {
    return this.festivalClassService.update(festivalClassID, festivalClass)
  }

  @Mutation('removeFestivalClass')
  remove(@Args('id') id: tbl_classlist['id']) {
    return this.festivalClassService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField('trophies')
  trophies(@Parent() festivalClass: tbl_classlist) {
    const { id }: { id: tbl_classlist['id'] } = festivalClass
    return this.festivalClassService.findClassTrophies(id)
  }

  @ResolveField('level')
  level(@Parent() festivalClass: tbl_classlist) {
    const { levelID }: { levelID: tbl_classlist['levelID'] } = festivalClass
    return this.levelService.findOne(levelID)
  }
  @ResolveField('subdiscipline')
  subdiscipline(@Parent() festivalClass: tbl_classlist) {
    const {
      subdisciplineID,
    }: { subdisciplineID: tbl_classlist['subdisciplineID'] } = festivalClass
    return this.subdisciplineService.findOne(subdisciplineID)
  }
  @ResolveField('category')
  category(@Parent() festivalClass: tbl_classlist) {
    const { categoryID }: { categoryID: tbl_classlist['categoryID'] } =
      festivalClass
    return this.categoryService.findOne(categoryID)
  }
}
