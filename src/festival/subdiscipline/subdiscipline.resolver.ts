import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { SubdisciplineService } from './subdiscipline.service'
import { SubdisciplineInput, SGSlabel } from 'src/graphql'
import {
  tbl_discipline,
  tbl_category,
  tbl_level,
  tbl_subdiscipline,
} from '@prisma/client'
import { FestivalClassService } from '../festival-class/festival-class.service'
// import { SubdisciplineInput } from './dto/create-subdiscipline.input'
// import { UpdateSubdisciplineInput } from './dto/update-subdiscipline.input'

@Resolver('Subdiscipline')
export class SubdisciplineResolver {
  constructor(
    private readonly subdisciplineService: SubdisciplineService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query('subdisciplines')
  async findAll(
    @Args('disciplineID') disciplineID: tbl_discipline['id'],
    @Args('levelID') levelID: tbl_level['id'],
    @Args('categoryID') categoryID: tbl_category['id'],
  ) {
    return this.subdisciplineService.findAll(disciplineID, levelID, categoryID)
  }

  @Query('subdiscipline')
  async findOne(@Args('id') id: tbl_subdiscipline['id']) {
    return this.subdisciplineService.findOne(id)
  }

  @Query('subdisciplinesByName')
  async findSubByName(@Args('name') name: tbl_subdiscipline['name']) {
    return this.subdisciplineService.findSubByName(name)
  }

  /** Mutations */

  @Mutation('createSubdiscipline')
  async create(
    @Args('disciplineID') disciplineID: tbl_discipline['id'],
    @Args('subdisciplineInput')
    subdisciplineInput: tbl_subdiscipline,
  ) {
    return this.subdisciplineService.create(disciplineID, subdisciplineInput)
  }

  @Mutation('updateSubdiscipline')
  update(
    @Args('subdisciplineID') subdisciplineID: tbl_subdiscipline['id'],
    @Args('subdisciplineInput')
    subdisciplineInput: SubdisciplineInput,
  ) {
    return this.subdisciplineService.update(subdisciplineID, subdisciplineInput)
  }

  @Mutation('removeSubdiscipline')
  remove(@Args('id') id: tbl_subdiscipline['id']) {
    return this.subdisciplineService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField('classes')
  classes(
    @Parent() { id }: tbl_subdiscipline,
    @Args('SGSlabel') SGSlabel: SGSlabel,
    @Args('levelID') levelID: tbl_level['id'],
    @Args('categoryID') categoryID: tbl_category['id'],
  ) {
    const subdisciplineID = id
    return this.festivalClassService.findAll(
      SGSlabel,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }
}
