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
import { RegistrationService } from '@/submissions/registration/registration.service'
import {
  Teacher,
  TeacherPayload,
} from '@/submissions/teacher/entities/teacher.entity'
import { TeacherInput } from './dto/teacher.input'
import { TeacherTypeInput } from './dto/teacherType.input'
import { TeacherService } from './teacher.service'

@Resolver(() => Teacher)
@UseGuards(JwtAuthGuard)
export class TeacherResolver {
  private readonly logger = new Logger(TeacherResolver.name)

  constructor(
    private readonly teacherService: TeacherService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query(() => [Teacher])
  async teachers(
    @Args('teacherType', { type: () => String })
    teacherType: TeacherTypeInput['teacherType'],
  ) {
    // ✅ Defensive check - ensure teacherType is provided
    if (!teacherType || teacherType.trim() === '') {
      this.logger.error('teachers query failed - teacherType is required')
      throw new BadRequestException('Teacher type is required')
    }

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
    // ✅ Defensive check - at least one parameter is required
    if (!teacherID && (!teacherEmail || teacherEmail.trim() === '')) {
      this.logger.error('teacher query failed - Either teacherID or teacherEmail is required')
      throw new BadRequestException('Either teacher ID or teacher email is required')
    }

    this.logger.log(`Fetching teacher${teacherID ? ` with ID: ${teacherID}` : ` with email: ${teacherEmail}`}`)
    return await this.teacherService.findOne(teacherID, teacherEmail)
  }

  @Query(() => Teacher)
  async myStudents(@Context() context) {
    // ✅ Defensive check - ensure user context exists
    if (!context?.req?.user) {
      this.logger.error('myStudents query failed - User context missing')
      throw new BadRequestException('User authentication required')
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
    // ✅ Defensive checks - ensure required parameters are provided
    if (privateTeacher === undefined || privateTeacher === null) {
      this.logger.error('teacherCreate mutation failed - privateTeacher flag is required')
      throw new BadRequestException('Private teacher flag is required')
    }

    if (schoolTeacher === undefined || schoolTeacher === null) {
      this.logger.error('teacherCreate mutation failed - schoolTeacher flag is required')
      throw new BadRequestException('School teacher flag is required')
    }

    if (!teacherInput) {
      this.logger.error('teacherCreate mutation failed - teacherInput is required')
      throw new BadRequestException('Teacher input is required')
    }

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
    // ✅ Defensive checks - ensure teacherID and input are provided
    if (!teacherID) {
      this.logger.error('teacherUpdate mutation failed - teacherID is required')
      throw new BadRequestException('Teacher ID is required')
    }

    if (!teacherInput || Object.keys(teacherInput).length === 0) {
      this.logger.error('teacherUpdate mutation failed - teacherInput is required')
      throw new BadRequestException('Teacher input is required')
    }

    this.logger.log(`Updating teacher ID: ${teacherID}`)
    return await this.teacherService.update(teacherID, teacherInput)
  }

  @Mutation(() => TeacherPayload)
  async teacherDelete(
    @Args('teacherID', { type: () => Int }) teacherID: Teacher['id'],
  ) {
    // ✅ Defensive check - ensure teacherID is provided
    if (!teacherID) {
      this.logger.error('teacherDelete mutation failed - teacherID is required')
      throw new BadRequestException('Teacher ID is required')
    }

    this.logger.log(`Deleting teacher ID: ${teacherID}`)
    return await this.teacherService.remove(teacherID)
  }

  /** Field Resolver */
  @ResolveField(() => [Registration])
  async registrations(@Parent() teacher: Teacher) {
    if (!teacher?.id) {
      this.logger.error('registrations field resolver failed - Invalid teacher or missing id')
      throw new BadRequestException('Invalid teacher')
    }

    this.logger.debug(`Fetching registrations for teacher ID: ${teacher.id}`)

    const { id }: { id: Teacher['id'] } = teacher
    const teacherID = id
    return await this.registrationService.findAll(
      undefined,
      undefined,
      teacherID,
    )
  }
}
