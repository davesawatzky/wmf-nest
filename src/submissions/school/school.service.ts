import { Injectable } from '@nestjs/common'
import { tbl_reg_school, tbl_registration } from '@prisma/client'
import { SchoolInput } from './dto/school.input'
import { PrismaService } from '@/prisma/prisma.service'
import { UserError } from '@/common.entity'

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    schoolInput?: Partial<SchoolInput>,
  ) {
    let school: tbl_reg_school
    let userErrors: UserError[]
    try {
      userErrors = []
      school = await this.prisma.tbl_reg_school.create({
        data: {
          regID: registrationID,
          ...schoolInput,
        },
      })
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot create school. Missing registration',
            field: ['registrationId'],
          },
        ]
        school = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot create school',
            field: [],
          },
        ]
        school = null
      }
    }
    return {
      userErrors,
      school,
    }
  }

  async findAll() {
    return await this.prisma.tbl_reg_school.findMany()
  }

  async findOne(
    registrationID?: tbl_registration['id'],
    schoolID?: tbl_reg_school['id'],
  ) {
    return await this.prisma.tbl_reg_school.findUnique({
      where: {
        regID: registrationID ?? undefined,
        id: schoolID ?? undefined,
      },
    })
  }

  async update(
    schoolID: tbl_reg_school['id'],
    schoolInput: Partial<SchoolInput>,
  ) {
    let school: tbl_reg_school
    let userErrors: UserError[]
    try {
      userErrors = []
      school = await this.prisma.tbl_reg_school.update({
        where: { id: schoolID },
        data: { ...schoolInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'School to update not found',
            field: ['id'],
          },
        ]
        school = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update school',
            field: [],
          },
        ]
        school = null
      }
    }
    return {
      userErrors,
      school,
    }
  }

  async remove(schoolID: tbl_reg_school['id']) {
    let school: tbl_reg_school
    let userErrors: UserError[]
    try {
      userErrors = []
      school = await this.prisma.tbl_reg_school.delete({
        where: { id: schoolID },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'School to delete not found',
            field: ['id'],
          },
        ]
        school = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete school',
            field: [],
          },
        ]
        school = null
      }
    }
    return {
      userErrors,
      school,
    }
  }
}
