import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TeacherService } from './teacher.service'
import { tbl_registration } from '@prisma/client'
import { TeacherInput } from './dto/teacher.input'
import { Teacher, TeacherPayload } from './entities/teacher.entity'

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  /** Queries */

  @Query(() => [Teacher])
  async teachers() {
    return this.teacherService.findAll()
  }

  @Query(() => Teacher)
  async teacher(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
  ) {
    return this.teacherService.findOne(teacherID)
  }

  /** Mutations */

  @Mutation(() => TeacherPayload)
  async teacherCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>,
  ) {
    return this.teacherService.create(registrationID, teacherInput)
  }

  @Mutation(() => TeacherPayload)
  async teacherUpdate(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>,
  ) {
    return this.teacherService.update(teacherID, teacherInput)
  }

  @Mutation(() => TeacherPayload)
  async teacherRemove(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
  ) {
    return this.teacherService.remove(teacherID)
  }
}
