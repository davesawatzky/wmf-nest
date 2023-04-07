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
import { SGS_label } from 'src/common.entity'
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
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query(() => [Subdiscipline])
  async subdisciplines(
    @Args('disciplineID', { type: () => Int })
    disciplineID: tbl_discipline['id'],
    @Args('levelID', { type: () => Int }) levelID: tbl_level['id'],
    @Args('categoryID', { type: () => Int }) categoryID: tbl_category['id'],
    @Args('performer_type', { type: () => SGS_label })
    performer_type: SGS_label,
  ) {
    return this.subdisciplineService.findAll(
      disciplineID,
      levelID,
      categoryID,
      performer_type,
    )
  }

  @Query(() => Subdiscipline)
  async subdiscipline(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
  ) {
    return this.subdisciplineService.findOne(subdisciplineID)
  }

  @Query(() => [Subdiscipline])
  async subdisciplinesByName(
    @Args('name', { type: () => String })
    name: Subdiscipline['name'],
  ) {
    return this.subdisciplineService.findSubByName(name)
  }

  /** Mutations */

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineCreate(
    @Args('disciplineID', { type: () => Int })
    disciplineID: tbl_discipline['id'],
    @Args('subdisciplineInput')
    subdisciplineInput: SubdisciplineInput,
  ) {
    return this.subdisciplineService.create(disciplineID, subdisciplineInput)
  }

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineUpdate(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
    @Args('subdisciplineInput', { type: () => SubdisciplineInput })
    subdisciplineInput: SubdisciplineInput,
  ) {
    return this.subdisciplineService.update(subdisciplineID, subdisciplineInput)
  }

  @Mutation(() => SubdisciplinePayload)
  async subdisciplineDelete(
    @Args('subdisciplineID', { type: () => Int })
    subdisciplineID: Subdiscipline['id'],
  ) {
    return this.subdisciplineService.remove(subdisciplineID)
  }

  /** Field Resolvers */

  @ResolveField()
  async festivalClasses(
    @Parent() Subdiscipline: tbl_subdiscipline,
    @Args('SGS_label') SGS_label: SGS_label,
    @Args('levelID', { type: () => Int }) levelID: tbl_level['id'],
    @Args('categoryID', { type: () => Int }) categoryID: tbl_category['id'],
  ) {
    const subdisciplineID = Subdiscipline.id
    return this.festivalClassService.findAll(
      SGS_label,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }
}
