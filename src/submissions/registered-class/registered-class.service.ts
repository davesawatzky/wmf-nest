import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_classes } from '@prisma/client'
import { RegisteredClassInput } from './dto/registered-class.input'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RegisteredClassService {
  constructor(private prisma: PrismaService) {}

  create(
    registrationID: tbl_registration['id'],
    registeredClassInput: Partial<RegisteredClassInput>,
  ) {
    return this.prisma.tbl_reg_classes.create({
      data: {
        regID: registrationID,
        ...registeredClassInput,
      },
    })
  }

  findAll(registrationID?: tbl_registration['id']) {
    return this.prisma.tbl_reg_classes.findMany({
      where: { regID: registrationID },
    })
  }

  findOne(registeredClassID: tbl_reg_classes['id']) {
    return this.prisma.tbl_reg_classes.findUnique({
      where: { id: registeredClassID },
    })
  }

  update(
    registeredClassID: tbl_reg_classes['id'],
    registeredClassInput: Partial<RegisteredClassInput>,
  ) {
    return this.prisma.tbl_reg_classes.update({
      where: { id: registeredClassID },
      data: { ...registeredClassInput },
    })
  }

  remove(registeredClassID: tbl_reg_classes['id']) {
    return this.prisma.tbl_reg_classes.delete({
      where: { id: registeredClassID },
    })
  }
}
