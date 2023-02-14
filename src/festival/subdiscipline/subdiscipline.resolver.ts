import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { SubdisciplineService } from './subdiscipline.service'
import { SubdisciplineInput } from 'src/graphql'
import {
  tbl_discipline,
  tbl_category,
  tbl_level,
  tbl_subdiscipline,
} from '@prisma/client'
// import { SubdisciplineInput } from './dto/create-subdiscipline.input'
// import { UpdateSubdisciplineInput } from './dto/update-subdiscipline.input'

@Resolver('Subdiscipline')
export class SubdisciplineResolver {
  constructor(private readonly subdisciplineService: SubdisciplineService) {}

  @Mutation('createSubdiscipline')
  async create(
    @Args('disciplineID') disciplineID: tbl_discipline['id'],
    @Args('subdisciplineInput')
    subdisciplineInput: tbl_subdiscipline,
  ) {
    return this.subdisciplineService.create(disciplineID, subdisciplineInput)
  }

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

  @ResolveField('classes')
  classes(@Parent() subdiscipline: tbl_subdiscipline) {
    return this.subdisciplineService.findClasses(subdiscipline.id)
  }
}
