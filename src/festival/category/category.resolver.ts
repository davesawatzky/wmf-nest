import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PerformerType } from '@/common.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
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
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { CategoryService } from './category.service'
import { CategoryInput } from './dto/category.input'
import { Category, CategoryPayload } from './entities/category.entity'

@Resolver(() => Category)
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query(() => [Category])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Category })
  async categories(
    @Args('levelID', { type: () => Int, nullable: true })
    levelID: tbl_level['id'] | null,
    @Args('subdisciplineID', { type: () => Int, nullable: true })
    subdisciplineID: tbl_subdiscipline['id'] | null,
  ) {
    return await this.categoryService.findAll(levelID, subdisciplineID)
  }

  @Query(() => Category)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Category })
  async category(@Args('id', { type: () => Int }) id: Category['id']) {
    return await this.categoryService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => CategoryPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Category })
  async categoryCreate(@Args('categoryInput') categoryInput: CategoryInput) {
    let response: any
    try {
      response = await this.categoryService.create(categoryInput)
    }
    catch (error) {
      throw new HttpException('Could not create category', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => CategoryPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Category })
  async categoryUpdate(
    @Args('categoryID', { type: () => Int })
    categoryID: Category['id'],
    @Args('categoryInput') categoryInput: CategoryInput,
  ) {
    let response: any
    try {
      response = await this.categoryService.update(categoryID, categoryInput)
    }
    catch (error) {
      throw new HttpException('Category to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => CategoryPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Category })
  async categoryDelete(@Args('categoryID', { type: () => Int }) categoryID: Category['id']) {
    let response: any
    try {
      response = await this.categoryService.remove(categoryID)
    }
    catch (error) {
      throw new HttpException('Category to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  /** Field Resolvers */
  @ResolveField(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(
    @Parent() category: tbl_category,
    @Args('performerType', { type: () => PerformerType })
    performerType: PerformerType,
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: tbl_subdiscipline['id'],
    @Args('levelID', { type: () => Int }) levelID: tbl_level['id'],
  ) {
    const categoryID = category.id
    return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }
}
