import { BadRequestException, Injectable } from '@nestjs/common'
import { tbl_user } from '@prisma/client'
import { TeacherInput } from './dto/teacher.input'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(teacherInput: Partial<TeacherInput>) {
    try {
      if (
        teacherInput.privateTeacher === true ||
        teacherInput.schoolTeacher === true
      ) {
        return {
          userErrors: [],
          teacher: await this.prisma.tbl_user.create({
            data: {
              ...teacherInput,
            },
          }),
        }
      } else {
        return {
          userErrors: [{ message: 'Not a teacher', teacher: null }],
        }
      }
    } catch (err) {
      console.log(err)
      throw new BadRequestException('Error creating Teacher')
    }
  }

  async findAll(privateTeacher?: boolean, schoolTeacher?: boolean) {
    try {
      if (privateTeacher === null || schoolTeacher === null) {
        privateTeacher === true
        schoolTeacher === true
      }
      if (privateTeacher === true || schoolTeacher === true) {
        const teachers = await this.prisma.tbl_user.findMany({
          distinct: ['firstName', 'lastName', 'instrument'],
          where: { privateTeacher, schoolTeacher },
          orderBy: { lastName: 'asc' },
        })
        const teachersFiltered = teachers.map((obj) => {
          const {
            password,
            staff,
            admin,
            privateTeacher,
            schoolTeacher,
            ...teacherProps
          } = obj
          return { teacherProps }
        })
        return teachersFiltered
      } else {
        return { userErrors: [{ message: 'Not teachers' }] }
      }
    } catch (err) {
      console.log(err)
      throw new BadRequestException('Error searching for teachers')
    }
  }

  async findOne(teacherID: tbl_user['id']) {
    try {
      if (teacherID) {
        const teacher = await this.prisma.tbl_user.findUnique({
          where: {
            id: teacherID,
          },
        })
        if (teacher.privateTeacher === true || teacher.schoolTeacher === true) {
          const { password, staff, admin, ...teacherProps } = teacher
          return {
            userErrors: [],
            teacherProps,
          }
        } else {
          return {
            userErrors: [
              {
                message: 'Teacher not found',
              },
            ],
            teacher: null,
          }
        }
      }
    } catch (err) {
      console.log(err)
      throw new BadRequestException('No teacher found with that ID.')
    }
  }

  async update(teacherID: tbl_user['id'], teacherInput: Partial<TeacherInput>) {
    try {
      return {
        userErrors: [],
        teacher: await this.prisma.tbl_user.update({
          where: {
            id: teacherID,
            AND: [{ privateTeacher: true } || { schoolTeacher: true }],
          },
          data: { ...teacherInput },
        }),
      }
    } catch (err) {
      console.log(err)
      throw new BadRequestException(
        `Cannot update teacher with id: ${teacherID}`
      )
    }
  }

  async remove(teacherID: tbl_user['id']) {
    try {
      return {
        userErrors: [],
        teacher: await this.prisma.tbl_user.delete({
          where: {
            id: teacherID,
            AND: [{ privateTeacher: true } || { schoolTeacher: true }],
          },
        }),
      }
    } catch (err) {
      console.log(err)
      throw new BadRequestException(
        `Cannot remove teacher with id: ${teacherID}`
      )
    }
  }
}
