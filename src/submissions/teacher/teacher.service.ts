import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_user } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { TeacherInput } from './dto/teacher.input'
import { TeacherTypeInput } from './dto/teacherType.input'
import { Teacher } from './entities/teacher.entity'

@Injectable()
export class TeacherService {
  private readonly logger = new Logger(TeacherService.name)
  constructor(private prisma: PrismaService) {}

  async create(
    privateTeacher: boolean,
    schoolTeacher: boolean,
    teacherInput: Partial<TeacherInput>,
  ) {
    try {
      this.logger.log('Creating new teacher')

      if (!privateTeacher && !schoolTeacher) {
        this.logger.warn('Teacher creation attempted without teacher type')
        return {
          userErrors: [
            {
              message: 'Must specify either private teacher or school teacher',
              field: ['privateTeacher', 'schoolTeacher'],
            },
          ],
          teacher: null,
        }
      }

      const teacher = await this.prisma.tbl_user.create({
        data: {
          privateTeacher,
          schoolTeacher,
          ...teacherInput,
        },
      })

      // Remove sensitive fields from response
      const { password, roles, ...teacherResponse } = teacher

      return {
        userErrors: [],
        teacher: teacherResponse,
      }
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        this.logger.warn(
          `Teacher creation failed - Unique constraint violation: ${error.meta?.target}`,
        )
        return {
          userErrors: [
            {
              message: 'Email address is already taken',
              field: ['email'],
            },
          ],
          teacher: null,
        }
      }
      else {
        this.logger.error('Unexpected error during teacher creation', error)
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while creating the teacher',
              field: [],
            },
          ],
          teacher: null,
        }
      }
    }
  }

  async findAll(teacherType: TeacherTypeInput['teacherType']) {
    try {
      this.logger.log(`Finding all teachers of type: ${teacherType}`)

      // if (!teacherType) {
      //   throw new BadRequestException('Teacher type must be specified')
      // }

      let teachersData = []

      if (teacherType === 'privateTeacher') {
        teachersData = await this.prisma.tbl_user.findMany({
          where: { privateTeacher: true },
          orderBy: { lastName: 'asc' },
        })
      }
      else if (teacherType === 'schoolTeacher') {
        teachersData = await this.prisma.tbl_user.findMany({
          where: { schoolTeacher: true },
          orderBy: { lastName: 'asc' },
        })
      }
      // else {
      //   throw new BadRequestException('Invalid teacher type specified')
      // }

      if (!teachersData || teachersData.length === 0) {
        this.logger.warn(`No teachers found for type: ${teacherType}`)
        return []
      }

      // Remove sensitive fields and reorder
      const teachersFiltered = teachersData.map((obj) => {
        const {
          password,
          staff,
          roles,
          privateTeacher,
          schoolTeacher,
          ...teacherProps
        } = obj
        return teacherProps
      })

      // Handle special "No Teacher" entry
      const noTeacherIndex = teachersFiltered.findIndex(
        el => el.firstName === 'Teacher' && el.lastName === 'No',
      )

      if (noTeacherIndex !== -1) {
        const noTeacher = teachersFiltered.splice(noTeacherIndex, 1)
        if (teacherType === 'privateTeacher') {
          teachersFiltered.unshift(noTeacher[0])
        }
      }

      // Add "Unlisted Teacher" option at the beginning
      teachersFiltered.unshift({
        id: 1,
        firstName: 'Teacher',
        lastName: 'Unlisted',
        instrument: '',
      })

      return teachersFiltered
    }
    catch (error: any) {
      // Re-throw known exceptions
      if (error instanceof BadRequestException) {
        // throw error
      }

      this.logger.error(
        `Failed to find teachers of type: ${teacherType}`,
        error,
      )
      // throw new InternalServerErrorException('Failed to retrieve teachers')
    }
  }

  async findOne(
    teacherID?: tbl_user['id'],
    email?: tbl_user['email'],
  ): Promise<Teacher | null> {
    try {
      this.logger.log(
        `Finding teacher by ${teacherID ? `ID: ${teacherID}` : `email: ${email}`}`,
      )

      if (!teacherID && !email) {
        this.logger.log('FindOne called without teacherID or email parameters')
        return null
      }

      let teacher: tbl_user | null = null

      if (teacherID) {
        teacher = await this.prisma.tbl_user.findUnique({
          where: { id: teacherID },
        })
      }
      else if (email) {
        teacher = await this.prisma.tbl_user.findUnique({
          where: { email },
        })
      }

      if (!teacher) {
        this.logger.log(
          `Teacher not found with ${teacherID ? `ID: ${teacherID}` : `email: ${email}`} - available for creations`,
        )
        return null
      }

      // Check if the user is actually a teacher
      if (!teacher.privateTeacher && !teacher.schoolTeacher) {
        this.logger.warn(
          `User found but is not a teacher: ${teacherID || email}`,
        )
        // throw new NotFoundException('User is not a teacher')
      }

      // Remove sensitive fields from response
      const { password, roles, ...teacherProps } = teacher
      return teacherProps
    }
    catch (error: any) {
      // Re-throw known exceptions
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        // throw error
      }

      this.logger.error(
        `Failed to find teacher by ${teacherID ? `ID: ${teacherID}` : `email: ${email}`}`,
        error,
      )
      // throw new InternalServerErrorException('Failed to retrieve teacher')
    }
  }

  async update(teacherID: number, teacherInput: TeacherInput) {
    try {
      this.logger.log(`Updating teacher ${teacherID}`)

      const teacher = await this.prisma.tbl_user.update({
        where: { id: teacherID },
        data: { ...teacherInput },
      })

      // Remove sensitive fields from response
      const { password, roles, ...teacherResponse } = teacher

      return {
        userErrors: [],
        teacher: teacherResponse,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Teacher update failed - Teacher with ID ${teacherID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Teacher not found',
              field: ['id'],
            },
          ],
          teacher: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Teacher update failed - Unique constraint violation: ${error.meta?.target}`,
        )
        return {
          userErrors: [
            {
              message: 'Email address is already taken',
              field: ['email'],
            },
          ],
          teacher: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during teacher update for ID ${teacherID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while updating the teacher',
              field: [],
            },
          ],
          teacher: null,
        }
      }
    }
  }

  async remove(teacherID: tbl_user['id']) {
    try {
      this.logger.log(`Deleting teacher ${teacherID}`)

      const teacher = await this.prisma.tbl_user.delete({
        where: { id: teacherID },
      })

      // Remove sensitive fields from response
      const { password, roles, ...teacherResponse } = teacher

      return {
        userErrors: [],
        teacher: teacherResponse,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Teacher deletion failed - Teacher with ID ${teacherID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Teacher not found',
              field: ['id'],
            },
          ],
          teacher: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Teacher deletion failed - Foreign key constraint violation for teacher ${teacherID}`,
        )
        return {
          userErrors: [
            {
              message:
                'Cannot delete teacher with existing registrations or relationships',
              field: ['id'],
            },
          ],
          teacher: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during teacher deletion for ID ${teacherID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while deleting the teacher',
              field: [],
            },
          ],
          teacher: null,
        }
      }
    }
  }
}
