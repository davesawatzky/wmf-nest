import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { DisciplineService } from './discipline.service'
import { DisciplineInput } from 'src/graphql'
import { tbl_discipline } from '@prisma/client'
// import { CreateDisciplineInput } from './dto/create-discipline.input'
// import { UpdateDisciplineInput } from './dto/update-discipline.input'

@Resolver('Discipline')
export class DisciplineResolver {
  constructor(private readonly disciplineService: DisciplineService) {}

  /** Queries */

  @Query('disciplines')
  findAll() {
    return this.disciplineService.findAll()
  }

  @Query('discipline')
  findOne(@Args('id') id: tbl_discipline['id']) {
    return this.disciplineService.findOne(id)
  }

  /** Mutations */

  @Mutation('createDiscipline')
  create(@Args('disciplineInput') disciplineInput: DisciplineInput) {
    return this.disciplineService.create(disciplineInput)
  }

  @Mutation('updateDiscipline')
  update(
    @Args('id') id: tbl_discipline['id'],
    @Args('disciplineInput') disciplineInput: DisciplineInput,
  ) {
    return this.disciplineService.update(id, disciplineInput)
  }

  @Mutation('removeDiscipline')
  remove(@Args('id') id: tbl_discipline['id']) {
    return this.disciplineService.remove(id)
  }
}
