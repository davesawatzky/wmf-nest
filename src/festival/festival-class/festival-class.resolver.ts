import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PerformerType } from '@/common.entity'
import { CategoryService } from '@/festival/category/category.service'
import { Category } from '@/festival/category/entities/category.entity'
import { ClassTypeService } from '@/festival/class-type/class-type.service'
import { ClassType } from '@/festival/class-type/entities/class-type.entity'
import { Level } from '@/festival/level/entities/level.entity'
import { LevelService } from '@/festival/level/level.service'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service'
import { Trophy } from '@/festival/trophy/entities/trophy.entity'
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
import { tbl_class_type, tbl_classlist } from '@prisma/client'
import { FestivalClassInput, FestivalClassSearchArgs } from './dto/festival-class.input'
import {
  FestivalClass,
  FestivalClassPayload,
} from './entities/festival-class.entity'
import { FestivalClassService } from './festival-class.service'

@Resolver(() => FestivalClass)
@UseGuards(JwtAuthGuard)
export class FestivalClassResolver {
  constructor(
    private festivalClassService: FestivalClassService,
    private subdisciplineService: SubdisciplineService,
    private levelService: LevelService,
    private categoryService: CategoryService,
    private classTypeService: ClassTypeService,
  ) {}

  /** Queries */

  @Query(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
    @Args('festivalClassSearch', {
      type: () => FestivalClassSearchArgs,
      nullable: true,
    })
    festivalClassSearch: FestivalClassSearchArgs | null,
  ) {
    try {
      return await this.festivalClassService.findAll(
        performerType,
        festivalClassSearch?.subdisciplineID,
        festivalClassSearch?.levelID,
        festivalClassSearch?.categoryID,
      )
    }
    catch (error) {
      throw new HttpException('Festival classes not found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClassSearch(
    @Args('festivalClassSearch', { type: () => FestivalClassSearchArgs })
    festivalClassSearch: FestivalClassSearchArgs,
  ) {
    try {
      return await this.festivalClassService.search(festivalClassSearch)
    }
    catch (error) {
      throw new HttpException('Festival class not found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => FestivalClass)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClass(
    @Args('id', { type: () => Int }) id: FestivalClass['id'],
  ) {
    try {
      return await this.festivalClassService.findById(id)
    }
    catch (error) {
      throw new HttpException('Festival class not found', HttpStatus.NOT_FOUND)
    }
  }

  @Query(() => FestivalClass)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClassByNumber(
    @Args('festivalClassNumber', { type: () => String })
    festivalClassNumber: FestivalClass['classNumber'],
  ) {
    try {
      return await this.festivalClassService.findByNumber(festivalClassNumber)
    }
    catch (error) {
      throw new HttpException('Festival class not found', HttpStatus.NOT_FOUND)
    }
  }

  /** Mutations */

  @Mutation(() => FestivalClassPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: FestivalClass })
  async festivalClassCreate(
    @Args('festivalClassInput')
    festivalClassInput: FestivalClassInput,
  ) {
    let response: any
    try {
      response = await this.festivalClassService.create(festivalClassInput)
    }
    catch (error) {
      throw new HttpException('Could not create festival class', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => FestivalClassPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: FestivalClass })
  async festivalClassUpdate(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id'],
    @Args('festivalClassInput', { type: () => FestivalClassInput })
    festivalClassInput: FestivalClassInput,
  ) {
    let response: any
    try {
      response = await this.festivalClassService.update(
        festivalClassID,
        festivalClassInput,
      )
    }
    catch (error) {
      throw new HttpException('Could not update festival class', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => FestivalClassPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: FestivalClass })
  async festivalClassDelete(
    @Args('festivalClassID', { type: () => Int })
    festivalClassID: FestivalClass['id'],
  ) {
    return await this.festivalClassService.remove(festivalClassID)
  }

  /** Field Resolvers */

  @ResolveField(() => [Trophy])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async trophies(@Parent() festivalClass: FestivalClass) {
    const { classNumber }: { classNumber: FestivalClass['classNumber'] }
      = festivalClass
    return await this.festivalClassService.findClassTrophies(classNumber)
  }

  @ResolveField(() => Level)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Level })
  async level(@Parent() festivalClass: tbl_classlist) {
    const { levelID }: { levelID: tbl_classlist['levelID'] } = festivalClass
    return await this.levelService.findOne(levelID)
  }

  @ResolveField(() => Subdiscipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subdiscipline })
  async subdiscipline(@Parent() festivalClass: tbl_classlist) {
    const {
      subdisciplineID,
    }: { subdisciplineID: tbl_classlist['subdisciplineID'] } = festivalClass
    return await this.subdisciplineService.findOne(subdisciplineID)
  }

  @ResolveField(() => Category)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Category })
  async category(@Parent() festivalClass: tbl_classlist) {
    const { categoryID }: { categoryID: tbl_classlist['categoryID'] }
      = festivalClass
    return await this.categoryService.findOne(categoryID)
  }

  @ResolveField(() => ClassType)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ClassType })
  async classType(@Parent() festivalClass: tbl_classlist) {
    const { classTypeID }: { classTypeID: tbl_class_type['id'] } = festivalClass
    return await this.classTypeService.findOne(classTypeID)
  }
}
