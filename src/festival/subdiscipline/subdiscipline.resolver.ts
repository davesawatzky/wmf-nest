import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { SubdisciplineService } from './subdiscipline.service'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PerformerType } from 'src/common.entity'
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

@Resolver(() => Subdiscipline)
@UseGuards(JwtAuthGuard)
export class SubdisciplineResolver {
  constructor(
    private readonly subdisciplineService: SubdisciplineService,
    private readonly festivalClassService: FestivalClassService
  ) {}

  /** Queries */

  @Query(() => [Subdiscipline])
  async subdisciplines(
    @Args('disciplineID', { type: () => Int, nullable: true })
    disciplineID: tbl_discipline['id'],
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType
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

  @Query(() => [Subdiscipline])
  async subdisciplinesByName(
    @Args('name', { type: () => String })
    name: Subdiscipline['name']
  ) {
    return await this.subdisciplineService.findSubByName(name)
  }

  /** Mutations */

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineCreate(
    @Args('disciplineID', { type: () => Int })
    disciplineID: tbl_discipline['id'],
    @Args('subdisciplineInput')
    subdisciplineInput: SubdisciplineInput
  ) {
    return await this.subdisciplineService.create(
      disciplineID,
      subdisciplineInput
    )
  }

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineUpdate(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
    @Args('subdisciplineInput', { type: () => SubdisciplineInput })
    subdisciplineInput: SubdisciplineInput
  ) {
    return await this.subdisciplineService.update(
      subdisciplineID,
      subdisciplineInput
    )
  }

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineDelete(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id']
  ) {
    return await this.subdisciplineService.remove(subdisciplineID)
  }

  /** Field Resolvers */

  @ResolveField()
  async festivalClasses(
    @Parent() Subdiscipline: tbl_subdiscipline,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType,
    @Args('levelID', { type: () => Int, nullable: true })
    levelID: tbl_level['id'],
    @Args('categoryID', { type: () => Int, nullable: true })
    categoryID: tbl_category['id']
  ) {
    const subdisciplineID = Subdiscipline.id
    return await this.festivalClassService.findAll(
      performerType,
      subdisciplineID,
      levelID,
      categoryID
    )
  }
}
