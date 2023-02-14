import { Injectable } from '@nestjs/common'
import { RegistrationInput, Registration } from 'src/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
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

  findAll() {
    return this.prisma.tbl_registration.findMany()
  }

  findOne(id: Registration['id']) {
    return this.prisma.tbl_registration.findUnique({
      where: { id },
    })
  }

  update(
    registrationID: Registration['id'],
    registration: Partial<RegistrationInput>,
  ) {
    return this.prisma.tbl_registration.update({
      where: { id: registrationID },
      data: { ...registration },
    })
  }

  remove(id: number) {
    return `This action removes a #${id} registration`
  }
}
