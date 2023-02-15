import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { FestivalClassService } from '../festival-class/festival-class.service'
import { CategoryInput, SGSlabel } from 'src/graphql'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
// import { CreateCategoryInput } from './dto/create-category.input'
// import { UpdateCategoryInput } from './dto/update-category.input'

@Resolver('Category')
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query('categories')
  async findAll(
    @Args('levelID') levelID: tbl_level['id'],
    @Args('subdisciplineID') subdisciplineID: tbl_subdiscipline['id'],
  ) {
    return this.categoryService.findAll(levelID, subdisciplineID)
  }

  @Query('category')
  findOne(@Args('id') id: tbl_category['id']) {
    return this.categoryService.findOne(id)
  }

  /** Mutations */

  @Mutation('categoryCreate')
  create(@Args('categoryInput') categoryInput: CategoryInput) {
    return this.categoryService.create(categoryInput)
  }

  @Mutation('categoryUpdate')
  update(
    @Args('categoryID') categoryID: tbl_category['id'],
    @Args('categoryInput') categoryInput: CategoryInput,
  ) {
    return this.categoryService.update(categoryID, categoryInput)
  }

  @Mutation('categoryDelete')
  remove(@Args('id') id: tbl_category['id']) {
    return this.categoryService.remove(id)
  }

  /** Field Resolvers */
  @ResolveField('classes')
  classes(
    @Parent() { id }: tbl_category,
    @Args('SGSlabel') SGSlabel: SGSlabel,
    @Args('subdisciplineID') subdisciplineID: tbl_subdiscipline['id'],
    @Args('levelID') levelID: tbl_level['id'],
  ) {
    const categoryID = id
    return this.festivalClassService.findAll(
      SGSlabel,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }
}
