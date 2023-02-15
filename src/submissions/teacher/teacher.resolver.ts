import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TeacherService } from './teacher.service'
import { tbl_registration, tbl_reg_teacher } from '@prisma/client'
import { TeacherInput } from 'src/graphql'
// import { CreateTeacherInput } from './dto/create-teacher.input'
// import { UpdateTeacherInput } from './dto/update-teacher.input'

@Resolver('Teacher')
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  /** Queries */

  @Query('teachers')
  findAll() {
    return this.teacherService.findAll()
  }

  @Query('teacher')
  findOne(@Args('teacherID') teacherID: tbl_reg_teacher['id']) {
    return this.teacherService.findOne(teacherID)
  }

  /** Mutations */

  @Mutation('teacherCreate')
  create(
    @Args('registrationID') registrationID: tbl_registration['id'],
    @Args('teacherInput') teacherInput: Partial<TeacherInput>,
  ) {
    return this.teacherService.create(registrationID, teacherInput)
  }

  @Mutation('teacherUpdate')
  update(
    @Args('teacherID') teacherID: tbl_reg_teacher['id'],
    @Args('teacherInput') teacherInput: Partial<TeacherInput>,
  ) {
    return this.teacherService.update(teacherID, teacherInput)
  }

  @Mutation('teacherDelete')
  remove(@Args('teacherID') teacherID: tbl_reg_teacher['id']) {
    return this.teacherService.remove(teacherID)
  }
}
