import { BadRequestException, Injectable } from '@nestjs/common'
import { tbl_user } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { TeacherInput } from './dto/teacher.input'
import { TeacherTypeInput } from './dto/teacherType.input'
import { Teacher } from './entities/teacher.entity'

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(
    privateTeacher: boolean,
    schoolTeacher: boolean,
    teacherInput: Partial<TeacherInput>,
  ) {
    try {
      if (privateTeacher === true || schoolTeacher === true) {
        return {
          userErrors: [],
          teacher: await this.prisma.tbl_user.create({
            data: {
              privateTeacher,
              schoolTeacher,
              ...teacherInput,
            },
          }),
        }
      }
      else {
        return {
          userErrors: [{ message: 'Not a teacher' }],
          teacher: null,
        }
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException('Error creating Teacher')
    }
  }

  async findAll(teacherType: TeacherTypeInput['teacherType']) {
    try {
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
      if (teachersData) {
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
        const noTeacherIndex = teachersFiltered.findIndex(el => el.firstName === 'Teacher' && el.lastName === 'No')
        if (noTeacherIndex !== -1) {
          const noTeacher = teachersFiltered.splice(noTeacherIndex, 1)
          if (teacherType === 'privateTeacher') {
            teachersFiltered.unshift(noTeacher[0])
          }
        }
        teachersFiltered.unshift({ id: 1, firstName: 'Teacher', lastName: 'Unlisted', instrument: '' })
        return teachersFiltered
      }
      else {
        return { userErrors: [{ message: 'Not teachers' }] }
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException('Error searching for teachers')
    }
  }

  async findOne(teacherID?: tbl_user['id'], email?: tbl_user['email']): Promise<Teacher | null> {
    try {
      if (teacherID) {
        const teacher = await this.prisma.tbl_user.findUnique({
          where: {
            id: teacherID,
          },
        })
        if (teacher.privateTeacher === true || teacher.schoolTeacher === true) {
          const { password, roles, ...teacherProps } = teacher
          return teacherProps
        }
        else {
          return null
        }
      }
      else if (email) {
        const teacher = await this.prisma.tbl_user.findUnique({
          where: { email },
        })
        if (teacher) {
          const { password, roles, ...teacherProps } = teacher
          return teacherProps
        }
        else {
          return null
        }
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException('No teacher found with that ID or email.')
    }
  }

  async update(teacherID: number, teacherInput: TeacherInput) {
    try {
      return {
        userErrors: [],
        teacher: await this.prisma.tbl_user.update({
          where: { id: teacherID },
          data: { ...teacherInput },
        }),
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException(
        `Cannot update teacher with id: ${teacherID}`,
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
          },
        }),
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException(
        `Cannot remove teacher with id: ${teacherID}`,
      )
    }
  }
}
