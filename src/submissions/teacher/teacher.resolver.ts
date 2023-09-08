import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { TeacherService } from './teacher.service'
import { tbl_teachers } from '@prisma/client'
import { RegistrationService } from '../registration/registration.service'
//import { tbl_registration } from '@prisma/client'
import { TeacherInput } from './dto/teacher.input'
import { Teacher, TeacherPayload } from './entities/teacher.entity'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

@Resolver(() => Teacher)
@UseGuards(JwtAuthGuard)
export class TeacherResolver {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly registrationService: RegistrationService
  ) {}

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
    // @Args('registrationID', { type: () => Int })
    // registrationID: tbl_registration['id'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>
  ) {
    return await this.teacherService.create(teacherInput) // registrationID
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

  /** Field Resolver */
  @ResolveField()
  async registrations(@Parent() teacher: Teacher) {
    const { id }: { id: Teacher['id'] } = teacher
    const teacherID = id
    return await this.registrationService.findAll(null, null, teacherID)
  }
}
