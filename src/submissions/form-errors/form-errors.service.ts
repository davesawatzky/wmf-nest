import { Injectable } from '@nestjs/common'
import { tbl_registration } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { FormErrorInput } from './dto/form-error.input'

@Injectable()
export class FormErrorsService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    FormErrorInput: Partial<FormErrorInput>
  ) {
    return await this.prisma.tbl_reg_errors.create({
      data: {
        regID: registrationID,
        ...FormErrorInput,
      },
    })
  }

  async findAll(registrationID: number) {
    return await this.prisma.tbl_reg_errors.findMany({
      where: {
        regID: registrationID,
      },
    })
  }

  async findOne(formErrorID?: number, registrationID?: number) {
    if (formErrorID) {
      return await this.prisma.tbl_reg_errors.findUnique({
        where: { id: formErrorID },
      })
    } else if (registrationID) {
      return await this.prisma.tbl_reg_errors.findUnique({
        where: { regID: registrationID },
      })
    }
  }

  async update(formErrorID: number, formErrorInput: Partial<FormErrorInput>) {
    return await this.prisma.tbl_reg_errors.update({
      where: { id: formErrorID },
      data: { ...formErrorInput },
    })
  }

  async remove(formErrorID: number) {
    return await this.prisma.tbl_reg_errors.delete({
      where: { id: formErrorID },
    })
  }
}
