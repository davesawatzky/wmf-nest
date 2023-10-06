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
import { RegistrationService } from '../registration/registration.service'
import { TeacherInput } from './dto/teacher.input'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { User, UserPayload } from 'src/user/entities/user.entity'

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class TeacherResolver {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly registrationService: RegistrationService
  ) {}

  /** Queries */

  @Query(() => [User])
  async teachers(
    @Args('privateTeacher', { type: () => Boolean })
    privateTeacher: User['privateTeacher'],
    @Args('schoolTeacher', { type: () => Boolean })
    schoolTeacher: User['schoolTeacher']
  ) {
    return await this.teacherService.findAll(privateTeacher, schoolTeacher)
  }

  @Query(() => User)
  async teacher(
    @Args('teacherID', { type: () => Int })
    teacherID: User['id']
  ) {
    return await this.teacherService.findOne(teacherID)
  }

  /** Mutations */

  @Mutation(() => UserPayload)
  async teacherCreate(
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>
  ) {
    return await this.teacherService.create(teacherInput) // registrationID
  }

  @Mutation(() => UserPayload)
  async teacherUpdate(
    @Args('teacherID', { type: () => Int }) teacherID: User['id'],
    @Args('teacherInput', { type: () => TeacherInput })
    teacherInput: Partial<TeacherInput>
  ) {
    return await this.teacherService.update(teacherID, teacherInput)
  }

  @Mutation(() => UserPayload)
  async teacherDelete(
    @Args('teacherID', { type: () => Int }) teacherID: User['id']
  ) {
    return await this.teacherService.remove(teacherID)
  }

  /** Field Resolver */
  @ResolveField()
  async registrations(@Parent() teacher: User) {
    const { id }: { id: User['id'] } = teacher
    const teacherID = id
    return await this.registrationService.findAll(null, null, teacherID)
  }
}
