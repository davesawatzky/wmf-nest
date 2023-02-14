import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { CategoryInput } from 'src/graphql'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
// import { CreateCategoryInput } from './dto/create-category.input'
// import { UpdateCategoryInput } from './dto/update-category.input'

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation('createCategory')
  create(@Args('categoryInput') categoryInput: CategoryInput) {
    return this.categoryService.create(categoryInput)
  }

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

  @Mutation('updateCategory')
  update(
    @Args('categoryID') categoryID: tbl_category['id'],
    @Args('categoryInput') categoryInput: CategoryInput,
  ) {
    return this.categoryService.update(categoryID, categoryInput)
  }

  @Mutation('removeCategory')
  remove(@Args('id') id: tbl_category['id']) {
    return this.categoryService.remove(id)
  }

  @ResolveField('classes')
  classes(@Parent() category: tbl_category) {
    return this.categoryService.findClasses(category.id)
  }
}
