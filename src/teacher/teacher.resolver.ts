import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TeacherService } from './teacher.service'
import { CreateTeacherInput } from './dto/create-teacher.input'
import { UpdateTeacherInput } from './dto/update-teacher.input'

@Resolver('Teacher')
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation('createTeacher')
  create(@Args('createTeacherInput') createTeacherInput: CreateTeacherInput) {
    return this.teacherService.create(createTeacherInput)
  }

  @Query('teacher')
  findAll() {
    return this.teacherService.findAll()
  }

  @Query('teacher')
  findOne(@Args('id') id: number) {
    return this.teacherService.findOne(id)
  }

  @Mutation('updateTeacher')
  update(@Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput) {
    return this.teacherService.update(updateTeacherInput.id, updateTeacherInput)
  }

  @Mutation('removeTeacher')
  remove(@Args('id') id: number) {
    return this.teacherService.remove(id)
  }
}
