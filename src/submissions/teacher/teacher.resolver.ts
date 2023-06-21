import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TeacherService } from './teacher.service'
import { tbl_registration } from '@prisma/client'
import { TeacherInput } from './dto/teacher.input'
import { Teacher, TeacherPayload } from './entities/teacher.entity'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Registration } from '../registration/entities/registration.entity'

@Resolver(() => Teacher)
@UseGuards(JwtAuthGuard)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  /** Queries */

  @Query(() => [Teacher])
  async teachers() {
    return await this.teacherService.findAll()
  }

  @Query(() => Teacher)
  async teacher(
    @Args('teacherID', { type: () => Int })
    teacherID: Teacher['id']
  ) {
    return await this.teacherService.findOne(teacherID)
  }

  /** Mutations */

  @Mutation(() => TeacherPayload)
  async teacherCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>
  ) {
    return await this.teacherService.create(registrationID, teacherInput)
  }

  @Mutation(() => TeacherPayload)
  async teacherUpdate(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>
  ) {
    return await this.teacherService.update(teacherID, teacherInput)
  }

  @Mutation(() => TeacherPayload)
  async teacherDelete(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id']
  ) {
    return await this.teacherService.remove(teacherID)
  }
}
