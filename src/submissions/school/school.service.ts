import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_school } from '@prisma/client'
import { SchoolInput } from './dto/school.input'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    schoolInput?: Partial<SchoolInput>
  ) {
    return {
      userErrors: [],
      school: await this.prisma.tbl_reg_school.create({
        data: {
          regID: registrationID,
          ...schoolInput,
        },
      }),
    }
  }

  async findAll() {
    return await this.prisma.tbl_reg_school.findMany()
  }

  async findOne(
    registrationID?: tbl_registration['id'],
    schoolID?: tbl_reg_school['id']
  ) {
    return await this.prisma.tbl_reg_school.findUnique({
      where: { regID: registrationID, id: schoolID },
    })
  }

  async update(
    schoolID: tbl_reg_school['id'],
    schoolInput: Partial<SchoolInput>
  ) {
    return {
      userErrors: [],
      school: await this.prisma.tbl_reg_school.update({
        where: { id: schoolID },
        data: { ...schoolInput },
      }),
    }
  }

  async remove(schoolID: tbl_reg_school['id']) {
    return {
      userErrors: [],
      school: await this.prisma.tbl_reg_school.delete({
        where: { id: schoolID },
      }),
    }
  }
}
