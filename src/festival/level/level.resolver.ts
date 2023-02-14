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
import { Level, LevelInput, SGSlabel } from 'src/graphql'
import { FestivalClassService } from '../festival-class/festival-class.service'
// import { CreateLevelInput } from './dto/create-level.input'
// import { UpdateLevelInput } from './dto/update-level.input'

@Resolver('Level')
export class LevelResolver {
  constructor(
    private readonly levelService: LevelService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

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

  /** Mutations */

  @Mutation('createLevel')
  async create(@Args('levelInput') levelInput: LevelInput) {
    return this.levelService.create(levelInput)
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

  /** Field Resolver */

  @ResolveField('classes')
  classes(
    @Parent() { id }: tbl_level,
    @Args('SGSlabel') SGSlabel: SGSlabel,
    @Args('subdisciplineID') subdisciplineID: tbl_subdiscipline['id'],
    @Args('categoryID') categoryID: tbl_category['id'],
  ) {
    const levelID = id
    return this.festivalClassService.findAll(
      SGSlabel,
      subdisciplineID,
      levelID,
      categoryID,
    )
  }
}
