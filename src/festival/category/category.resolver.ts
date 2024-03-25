import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { FestivalClassService } from '../festival-class/festival-class.service'
import { CategoryInput } from './dto/category.input'
import { Category, CategoryPayload } from './entities/category.entity'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PerformerType } from '../../common.entity'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { FestivalClass } from '../festival-class/entities/festival-class.entity'

@Resolver(() => Category)
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly festivalClassService: FestivalClassService
  ) {}

  /** Queries */

  @Query(() => [Category])
  async categories(
    @Args('levelID', { type: () => Int, nullable: true })
    levelID: tbl_level['id'],
    @Args('subdisciplineID', { type: () => Int, nullable: true })
    subdisciplineID: tbl_subdiscipline['id']
  ) {
    return await this.categoryService.findAll(levelID, subdisciplineID)
  }

  @Query(() => Category)
  async category(@Args('id', { type: () => Int }) id: Category['id']) {
    return await this.categoryService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => CategoryPayload)
  async categoryCreate(@Args('categoryInput') categoryInput: CategoryInput) {
    return await this.categoryService.create(categoryInput)
  }

  @Mutation(() => CategoryPayload)
  async categoryUpdate(
    @Args('categoryID', { type: () => Int })
    categoryID: Category['id'],
    @Args('categoryInput') categoryInput: CategoryInput
  ) {
    return await this.categoryService.update(categoryID, categoryInput)
  }

  @Mutation(() => CategoryPayload)
  async categoryDelete(@Args('id', { type: () => Int }) id: Category['id']) {
    return await this.categoryService.remove(id)
  }

  /** Field Resolvers */
  @ResolveField(() => [FestivalClass])
  async festivalClasses(
    @Parent() category: tbl_category,
    @Args('performerType', { type: () => PerformerType })
    performerType: PerformerType,
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: tbl_subdiscipline['id'],
    @Args('levelID', { type: () => Int }) levelID: tbl_level['id']
  ) {
    const categoryID = category.id
        return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID
    )
  }
}
