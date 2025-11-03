import { BadRequestException, Logger } from '@nestjs/common'
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
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import {
  Teacher,
  TeacherPayload,
} from '@/submissions/teacher/entities/teacher.entity'
import { TeacherInput } from './dto/teacher.input'
import { TeacherTypeInput } from './dto/teacherType.input'
import { TeacherDataLoader } from './teacher.dataloader'
import { TeacherService } from './teacher.service'

@Resolver(() => Teacher)
@UseGuards(JwtAuthGuard)
export class TeacherResolver {
  private readonly logger = new Logger(TeacherResolver.name)

  constructor(
    private readonly teacherService: TeacherService,
    private readonly teacherDataLoader: TeacherDataLoader,
  ) {}

  /** Queries */

  @Query(() => [Teacher])
  async teachers(
    @Args('teacherType', { type: () => String })
    teacherType: TeacherTypeInput['teacherType'],
  ) {
    this.logger.log(`Fetching teachers with type: ${teacherType}`)
    return await this.teacherService.findAll(teacherType)
  }

  @Query(() => Teacher, { nullable: true })
  async teacher(
    @Args('teacherID', { type: () => Int, nullable: true })
    teacherID: Teacher['id'] | null,
    @Args('teacherEmail', { type: () => String, nullable: true })
    teacherEmail: Teacher['email'] | null,
  ) {
    this.logger.log(`Fetching teacher${teacherID ? ` with ID: ${teacherID}` : ` with email: ${teacherEmail}`}`)
    return await this.teacherService.findOne(teacherID, teacherEmail)
  }

  @Query(() => Teacher)
  async myStudents(@Context() context) {
    if (!context?.req?.user) {
      this.logger.error('myStudents query failed - User context missing')
      return null
    }
    const userID
      = context.req.user.privateTeacher || context.req.user.schoolTeacher
        ? context.req.user.id
        : null
    if (!userID) {
      this.logger.warn('myStudents query - User is not a teacher')
      return null
    }
    this.logger.log(`Fetching students for teacher user ID: ${userID}`)
    return await this.teacherService.findOne(userID)
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
    this.logger.log(`Creating teacher (private: ${privateTeacher}, school: ${schoolTeacher})`)
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
    this.logger.log(`Updating teacher ID: ${teacherID}`)
    return await this.teacherService.update(teacherID, teacherInput)
  }

  @Mutation(() => TeacherPayload)
  async teacherDelete(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
  ) {
    this.logger.log(`Deleting teacher ID: ${teacherID}`)
    return await this.teacherService.remove(teacherID)
  }

  /** Field Resolver */
  @ResolveField(() => [Registration])
  async registrations(@Parent() teacher: Teacher) {
    if (!teacher?.id) {
      this.logger.error('registrations field resolver failed - Invalid teacher or missing id')
      return null
    }
    this.logger.debug(`Fetching registrations for teacher ID: ${teacher.id}`)
    // Use DataLoader to batch registration queries
    return await this.teacherDataLoader.registrationsLoader.load(teacher.id)
  }
}
