import { Injectable } from '@nestjs/common'
import { tbl_teachers } from '@prisma/client'
import { TeacherInput } from './dto/teacher.input'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(
    //registrationID: tbl_registration['id'],
    teacherInput: Partial<TeacherInput>
  ) {
    return {
      userErrors: [],
      teacher: await this.prisma.tbl_teachers.create({
        data: {
          //regID: registrationID,
          ...teacherInput,
        },
      }),
    }
  }

  async findAll() {
    return await this.prisma.tbl_teachers.findMany({
      distinct: ['firstName', 'lastName', 'instrument'],
      orderBy: { lastName: 'asc' },
    })
  }

  async findOne(teacherID: tbl_teachers['id']) {
    if (teacherID) {
      return await this.prisma.tbl_teachers.findUnique({
        where: { id: teacherID },
      })
    }
  }

  async update(
    teacherID: tbl_teachers['id'],
    teacherInput: Partial<TeacherInput>
  ) {
    try {
      return {
        userErrors: [],
        teacher: await this.prisma.tbl_teachers.update({
          where: { id: teacherID },
          data: { ...teacherInput },
        }),
      }
    } catch (err) {
      console.log(err)
    }
  }

  async remove(teacherID: tbl_teachers['id']) {
    try {
      return {
        userErrors: [],
        teacher: await this.prisma.tbl_teachers.delete({
          where: { id: teacherID },
        }),
      }
    } catch (err) {
      console.log(err)
    }
  }
}
