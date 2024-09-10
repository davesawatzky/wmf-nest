import { PerformerType } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_user } from '@prisma/client'
import { RegistrationInput } from './dto/registration.input'

@Injectable()
export class RegistrationService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    userID: tbl_registration['userID'],
    performerType: PerformerType,
    label: tbl_registration['label'],
  ) {
    label === '' ? label = 'Registration Form' : label
    return {
      userErrors: [],
      registration: this.prisma.tbl_registration.create({
        data: {
          userID,
          performerType,
          label,
        },
      }),
    }
  }

  async findAll(
    userID?: tbl_user['id'],
    performerType?: PerformerType,
    teacherID?: tbl_user['id'],
  ) {
    return await this.prisma.tbl_registration.findMany({
      where: { userID, performerType, teacherID },
    })
  }

  async findOne(id: tbl_registration['id']) {
    return await this.prisma.tbl_registration.findUnique({
      where: { id },
    })
  }

  async update(
    registrationID: tbl_registration['id'],
    registrationInput: Partial<RegistrationInput>,
  ) {
    return {
      userErrors: [],
      registration: await this.prisma.tbl_registration.update({
        where: { id: registrationID },
        data: { ...registrationInput },
      }),
    }
  }

  async remove(id: tbl_registration['id']) {
    return {
      userErrors: [],
      registration: await this.prisma.tbl_registration.delete({
        where: { id },
      }),
    }
  }
}
