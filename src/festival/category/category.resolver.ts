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
import { HttpException, HttpStatus, UseFilters, UseGuards } from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { FestivalClass } from '../festival-class/entities/festival-class.entity'
import {GraphQLExceptionFilter} from '../../exceptionFilters/gql-exception.filter'

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
    levelID: tbl_level['id'] | null,
    @Args('subdisciplineID', { type: () => Int, nullable: true })
    subdisciplineID: tbl_subdiscipline['id'] | null
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
    let response: any
    try {
      response = await this.categoryService.create(categoryInput)
    } catch (error) {
      throw new HttpException('Could not create category', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => CategoryPayload)
  async categoryUpdate(
    @Args('categoryID', { type: () => Int })
    categoryID: Category['id'],
    @Args('categoryInput') categoryInput: CategoryInput
  ) {
    let response: any
    try {
      response = await this.categoryService.update(categoryID, categoryInput)
    } catch (error) {
      throw new HttpException('Category to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => CategoryPayload)
  async categoryDelete(@Args('categoryID', {type: () => Int}) categoryID: Category['id']) {
    let response: any
    try {
      response = await this.categoryService.remove(categoryID)
    } catch (error) {
      throw new HttpException('Category to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
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
