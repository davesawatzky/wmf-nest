import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { LevelService } from './level.service'
import { CreateLevelInput } from './dto/create-level.input'
import { UpdateLevelInput } from './dto/update-level.input'

@Resolver('Level')
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Mutation('createLevel')
  create(@Args('createLevelInput') createLevelInput: CreateLevelInput) {
    return this.levelService.create(createLevelInput)
  }

  @Query('level')
  findAll() {
    return this.levelService.findAll()
  }

  @Query('level')
  findOne(@Args('id') id: number) {
    return this.levelService.findOne(id)
  }

  @Mutation('updateLevel')
  update(@Args('updateLevelInput') updateLevelInput: UpdateLevelInput) {
    return this.levelService.update(updateLevelInput.id, updateLevelInput)
  }

  @Mutation('removeLevel')
  remove(@Args('id') id: number) {
    return this.levelService.remove(id)
  }
}
