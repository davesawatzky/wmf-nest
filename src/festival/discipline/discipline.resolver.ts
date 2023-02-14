import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { DisciplineService } from './discipline.service'
import { CreateDisciplineInput } from './dto/create-discipline.input'
import { UpdateDisciplineInput } from './dto/update-discipline.input'

@Resolver('Discipline')
export class DisciplineResolver {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Mutation('createDiscipline')
  create(
    @Args('createDisciplineInput') createDisciplineInput: CreateDisciplineInput,
  ) {
    return this.disciplineService.create(createDisciplineInput)
  }

  @Query('discipline')
  findAll() {
    return this.disciplineService.findAll()
  }

  @Query('discipline')
  findOne(@Args('id') id: number) {
    return this.disciplineService.findOne(id)
  }

  @Mutation('updateDiscipline')
  update(
    @Args('updateDisciplineInput') updateDisciplineInput: UpdateDisciplineInput,
  ) {
    return this.disciplineService.update(
      updateDisciplineInput.id,
      updateDisciplineInput,
    )
  }

  @Mutation('removeDiscipline')
  remove(@Args('id') id: number) {
    return this.disciplineService.remove(id)
  }
}
