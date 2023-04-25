import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_school } from '@prisma/client'
import { SchoolInput } from './dto/school.input'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  create(registrationID: tbl_registration['id'], schoolInput?: SchoolInput) {
    return {
      userErrors: [],
      school: this.prisma.tbl_reg_school.create({
        data: {
          regID: registrationID,
          ...schoolInput,
        },
      }),
    }
  }

  findAll() {
    return this.prisma.tbl_reg_school.findMany()
  }

  findOne(registrationID?: tbl_registration['id'], schoolID?: tbl_reg_school['id']) {
    return this.prisma.tbl_reg_school.findUnique({
      where: { regID: registrationID, id: schoolID },
    })
  }

  update(schoolID: tbl_reg_school['id'], schoolInput: Partial<SchoolInput>) {
    return this.prisma.tbl_reg_school.update({
      where: { id: schoolID },
      data: { ...schoolInput },
    })
  }

  remove(schoolID: tbl_reg_school['id']) {
    return this.prisma.tbl_reg_school.delete({
      where: { id: schoolID },
    })
  }
}
