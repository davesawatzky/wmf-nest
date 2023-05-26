import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_classes } from '@prisma/client'
import { RegisteredClassInput } from './dto/registered-class.input'
import { Registration } from '../registration/entities/registration.entity'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RegisteredClassService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: Registration['id'],
    // registeredClassInput: RegisteredClassInput
  ) {
    // const classExists = await this.prisma.tbl_reg_classes.count({
    //   where: {
    //     regID: registrationID,
    //     classNumber: registeredClassInput.classNumber,
    //   },
    // })
    // if (classExists > 0 && registeredClassInput.classNumber) {
    //   return {
    //     userErrors: [
    //       {
    //         message: `Registration form already includes class ${registeredClassInput.classNumber}.  Cannot add duplicate class.`,
    //       },
    //     ],
    //     registeredClass: null,
    //   }
    // }
    return {
      userErrors: [],
      registeredClass: this.prisma.tbl_reg_classes.create({
        data: { regID: registrationID  },
      }),
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    return this.prisma.tbl_reg_classes.findMany({
      where: { regID: registrationID },
    })
  }

  async findOne(registeredClassID: tbl_reg_classes['id']) {
    return this.prisma.tbl_reg_classes.findUnique({
      where: { id: registeredClassID },
    })
  }

  async update(
    registeredClassID: tbl_reg_classes['id'],
    registeredClassInput: RegisteredClassInput
  ) {
    const classEntryExists: tbl_reg_classes | null =
      await this.prisma.tbl_reg_classes.findUnique({
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
    return this.prisma.tbl_reg_classes.update({
      where: { id: registeredClassID },
      data: { ...registeredClassInput },
    })
  }

  async remove(registeredClassID: tbl_reg_classes['id']) {
    const classEntryExists: tbl_reg_classes | null =
      await this.prisma.tbl_reg_classes.findUnique({
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
    return this.prisma.tbl_reg_classes.delete({
      where: { id: registeredClassID },
    })
  }
}
