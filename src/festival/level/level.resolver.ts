import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { LevelService } from './level.service'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { Level, LevelInput } from 'src/graphql'
// import { CreateLevelInput } from './dto/create-level.input'
// import { UpdateLevelInput } from './dto/update-level.input'

@Resolver('Level')
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Mutation('createLevel')
  async create(@Args('levelInput') levelInput: LevelInput) {
    return this.levelService.create(levelInput)
  }

  @Query('levels')
  async findAll(
    @Args('categoryID') categoryID: tbl_category['id'],
    @Args('subdisciplineID') subdisciplineID: tbl_subdiscipline['id'],
  ) {
    return this.levelService.findAll(categoryID, subdisciplineID)
  }

  @Query('level')
  findOne(@Args('id') id: tbl_level['id']) {
    return this.levelService.findOne(id)
  }

  @Mutation('updateLevel')
  update(
    @Args('levelID') levelID: tbl_level['id'],
    @Args('levelInput') levelInput: LevelInput,
  ) {
    return this.levelService.update(levelID, levelInput)
  }

  @Mutation('removeLevel')
  remove(@Args('id') id: tbl_level['id']) {
    return this.levelService.remove(id)
  }

  @ResolveField('classes')
  classes(@Parent() level: tbl_level) {
    return this.levelService.findClasses(level.id)
  }
}
