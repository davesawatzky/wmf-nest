import { Injectable } from '@nestjs/common'
import { tbl_reg_class, tbl_registration } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegisteredClassInput } from './dto/registered-class.input'

@Injectable()
export class RegisteredClassService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: Registration['id'],
    registeredClass: Partial<RegisteredClassInput>,
  ) {
    return {
      userErrors: [],
      registeredClass: await this.prisma.tbl_reg_class.create({
        data: { regID: registrationID, ...registeredClass },
      }),
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    if (!registrationID) {
      const confirmedRegistrations = await this.prisma.tbl_registration.findMany({
        where: {
          confirmation: {
            not: null,
          },
        },
      })
      const registrationIDs = confirmedRegistrations.map(registration => registration.id)
      return await this.prisma.tbl_reg_class.findMany({
        where: {
          regID: { in: registrationIDs },
        },
        distinct: ['classNumber', 'discipline', 'subdiscipline', 'level', 'category'],
      })
    }
    else {
      return await this.prisma.tbl_reg_class.findMany({
        where: { regID: registrationID },
      })
    }
  }

  async findOne(registeredClassID: tbl_reg_class['id']) {
    return await this.prisma.tbl_reg_class.findUnique({
      where: { id: registeredClassID },
    })
  }

  async update(
    registeredClassID: tbl_reg_class['id'],
    registeredClassInput: RegisteredClassInput,
  ) {
    const classEntryExists: tbl_reg_class | null
      = await this.prisma.tbl_reg_class.findUnique({
        where: {
          id: registeredClassID,
        },
      })
    if (!classEntryExists) {
      return {
        userErrors: [
          {
            message: 'Class entry does not exist in registration form.',
          },
        ],
        registeredClass: null,
      }
    }
    return {
      userErrors: [],
      registeredClass: await this.prisma.tbl_reg_class.update({
        where: { id: registeredClassID },
        data: { ...registeredClassInput },
      }),
    }
  }

  async remove(registeredClassID: tbl_reg_class['id']) {
    const classEntryExists: tbl_reg_class | null
      = await this.prisma.tbl_reg_class.findUnique({
        where: {
          id: registeredClassID,
        },
      })
    if (!classEntryExists) {
      return {
        userErrors: [
          {
            message: 'Class entry does not exist in registration form.',
          },
        ],
        registeredClass: null,
      }
    }
    return {
      userErrors: [],
      registeredClass: await this.prisma.tbl_reg_class.delete({
        where: { id: registeredClassID },
      }),
    }
  }
}
