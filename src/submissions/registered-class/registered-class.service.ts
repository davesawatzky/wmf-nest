import { Injectable } from '@nestjs/common'
import { tbl_reg_classes, tbl_registration } from '@prisma/client'
import { RegisteredClassInput } from './dto/registered-class.input'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class RegisteredClassService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: Registration['id'],
    registeredClass: Partial<RegisteredClassInput>,
  ) {
    return {
      userErrors: [],
      registeredClass: await this.prisma.tbl_reg_classes.create({
        data: { regID: registrationID, ...registeredClass },
      }),
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    return await this.prisma.tbl_reg_classes.findMany({
      where: { regID: registrationID },
    })
  }

  async findOne(registeredClassID: tbl_reg_classes['id']) {
    return await this.prisma.tbl_reg_classes.findUnique({
      where: { id: registeredClassID },
    })
  }

  async update(
    registeredClassID: tbl_reg_classes['id'],
    registeredClassInput: RegisteredClassInput,
  ) {
    const classEntryExists: tbl_reg_classes | null
      = await this.prisma.tbl_reg_classes.findUnique({
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
      registeredClass: await this.prisma.tbl_reg_classes.update({
        where: { id: registeredClassID },
        data: { ...registeredClassInput },
      }),
    }
  }

  async remove(registeredClassID: tbl_reg_classes['id']) {
    const classEntryExists: tbl_reg_classes | null
      = await this.prisma.tbl_reg_classes.findUnique({
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
      registeredClass: await this.prisma.tbl_reg_classes.delete({
        where: { id: registeredClassID },
      }),
    }
  }
}
