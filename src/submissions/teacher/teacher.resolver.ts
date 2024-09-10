import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { Teacher, TeacherPayload } from '@/submissions/teacher/entities/teacher.entity'
import { UseGuards } from '@nestjs/common/decorators'
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { TeacherInput } from './dto/teacher.input'
import { TeacherService } from './teacher.service'

@Resolver(() => Teacher)
@UseGuards(JwtAuthGuard)
export class TeacherResolver {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query(() => [Teacher])
  async teachers(
    @Args('privateTeacher', { type: () => Boolean })
    privateTeacher: Teacher['privateTeacher'],
    @Args('schoolTeacher', { type: () => Boolean })
    schoolTeacher: Teacher['schoolTeacher'],
  ) {
    return await this.teacherService.findAll(privateTeacher, schoolTeacher)
  }

  @Query(() => Teacher)
  async teacher(
    @Args('teacherID', { type: () => Int, nullable: true })
    teacherID: Teacher['id'] | null,
    @Args('teacherEmail', { type: () => String, nullable: true })
    teacherEmail: Teacher['email'] | null,
  ) {
    return await this.teacherService.findOne(teacherID, teacherEmail)
  }

  @Query(() => Teacher)
  async myStudents(@Context() context) {
    const userID
      = context.req.user.privateTeacher || context.req.user.schoolTeacher
        ? context.req.user.id
        : null
    if (userID)
      return await this.teacherService.findOne(userID)
    else
      return null
  }

  /** Mutations */

  @Mutation(() => TeacherPayload)
  async teacherCreate(
    @Args('privateTeacher', { type: () => Boolean })
    privateTeacher: TeacherInput['privateTeacher'],
    @Args('schoolTeacher', { type: () => Boolean })
    schoolTeacher: TeacherInput['schoolTeacher'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>,
  ) {
    return await this.teacherService.create(
      privateTeacher,
      schoolTeacher,
      teacherInput,
    )
  }

  @Mutation(() => TeacherPayload)
  async teacherUpdate(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>,
  ) {
    return await this.teacherService.update(teacherID, teacherInput)
  }

  @Mutation(() => TeacherPayload)
  async teacherDelete(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
  ) {
    return await this.teacherService.remove(teacherID)
  }

  /** Field Resolver */
  @ResolveField(() => [Registration])
  async registrations(@Parent() teacher: Teacher) {
    const { id }: { id: Teacher['id'] } = teacher
    const teacherID = id
    return await this.registrationService.findAll(
      undefined,
      undefined,
      teacherID,
    )
  }
}
