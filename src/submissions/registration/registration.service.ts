import { Injectable } from '@nestjs/common'
import { RegistrationInput, Registration, SGSlabel } from 'src/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
import { tbl_user, tbl_registration } from '@prisma/client'
// import { CreateRegistrationInput } from './dto/create-registration.input';
// import { UpdateRegistrationInput } from './dto/update-registration.input';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  create(performerType, label) {
    label == '' ? 'Registration Form' : label
    return this.prisma.tbl_registration.create({
      data: {
        performerType,
        label,
      },
    })
  }

  findAll(userID?: tbl_user['id'], performerType?: SGSlabel) {
    return this.prisma.tbl_registration.findMany({
      where: { userID, performerType },
    })
  }

  findOne(id: tbl_registration['id']) {
    return this.prisma.tbl_registration.findUnique({
      where: { id },
    })
  }

  update(
    registrationID: tbl_registration['id'],
    registration: Partial<RegistrationInput>,
  ) {
    return this.prisma.tbl_registration.update({
      where: { id: registrationID },
      data: { ...registration },
    })
  }

  remove(id: tbl_registration['id']) {
    return this.prisma.tbl_registration.delete({
      where: { id },
    })
  }
}
