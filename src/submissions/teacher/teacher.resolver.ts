import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql'
import { TeacherService } from './teacher.service'
import { RegistrationService } from '../registration/registration.service'
import { TeacherInput } from './dto/teacher.input'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Teacher, TeacherPayload } from '../teacher/entities/teacher.entity'
import { Registration } from '../registration/entities/registration.entity'

@Resolver(() => Teacher)
@UseGuards(JwtAuthGuard)
export class TeacherResolver {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly registrationService: RegistrationService
  ) {}

  /** Queries */

  @Query(() => [Teacher])
  async teachers(
    @Args('privateTeacher', { type: () => Boolean })
    privateTeacher: Teacher['privateTeacher'],
    @Args('schoolTeacher', { type: () => Boolean })
    schoolTeacher: Teacher['schoolTeacher']
  ) {
    return await this.teacherService.findAll(privateTeacher, schoolTeacher)
  }

  @Query(() => Teacher)
  async teacher(
    @Args('teacherID', { type: () => Int, nullable: true })
    teacherID: Teacher['id'],
    @Context() context
  ) {
    const id =
      context.req.user.privateTeacher || context.req.user.schoolTeacher
        ? context.req.user.id
        : teacherID // TODO: May have to edit this with roles
    return await this.teacherService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => TeacherPayload)
  async teacherCreate(
    @Args('privateTeacher', { type: () => Boolean })
    privateTeacher: TeacherInput['privateTeacher'],
    @Args('schoolTeacher', { type: () => Boolean })
    schoolTeacher: TeacherInput['schoolTeacher'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>
  ) {
    return await this.teacherService.create(
      privateTeacher,
      schoolTeacher,
      teacherInput
    ) // registrationID
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
  @ResolveField(() => [Registration])
  async registrations(@Parent() teacher: Teacher) {
    const { id }: { id: Teacher['id'] } = teacher
    const teacherID = id
    return await this.registrationService.findAll(
      undefined,
      undefined,
      teacherID
    )
  }
}
