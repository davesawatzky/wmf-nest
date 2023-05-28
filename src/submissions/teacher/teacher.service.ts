import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_teacher } from '@prisma/client'
import { TeacherInput } from './dto/teacher.input'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  create(
    registrationID: tbl_registration['id'],
    teacherInput: Partial<TeacherInput>
  ) {
    return {
      userErrors: [],
      teacher: this.prisma.tbl_reg_teacher.create({
        data: {
          regID: registrationID,
          ...teacherInput,
        },
      }),
    }
  }

  findAll() {
    return this.prisma.tbl_reg_teacher.findMany()
  }

  findOne(
    teacherID?: tbl_reg_teacher['id'],
    registrationID?: tbl_registration['id']
  ) {
    if (teacherID) {
      return this.prisma.tbl_reg_teacher.findUnique({
        where: { id: teacherID },
      })
    } else if (registrationID) {
      return this.prisma.tbl_reg_teacher.findUnique({
        where: { regID: registrationID },
      })
    }
  }

  update(
    teacherID: tbl_reg_teacher['id'],
    teacherInput: Partial<TeacherInput>
  ) {
    return {
      userErrors: [],
      teacher: this.prisma.tbl_reg_teacher.update({
        where: { id: teacherID },
        data: { ...teacherInput },
      })
    }
  }

  remove(teacherID: tbl_reg_teacher['id']) {
    return {
      userErrors: [],
      teacher: this.prisma.tbl_reg_teacher.delete({
        where: { id: teacherID },
      })
    }
  }
}
