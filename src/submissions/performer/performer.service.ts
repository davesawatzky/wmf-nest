import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_performer } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { PerformerInput } from './dto/performer.input'

@Injectable()
export class PerformerService {
  constructor(private prisma: PrismaService) {}

  create(
    registrationID: tbl_registration['id'],
    performerInput: Partial<PerformerInput>,
  ) {
    return this.prisma.tbl_reg_performer.create({
      data: {
        regID: registrationID,
        ...performerInput,
      },
    })
  }

  findAll(registrationID?: tbl_registration['id']) {
    return this.prisma.tbl_reg_performer.findMany({
      where: { regID: registrationID },
    })
  }

  findOne(performerID: tbl_reg_performer['id']) {
    return this.prisma.tbl_reg_performer.findUnique({
      where: { id: performerID },
    })
  }

  update(
    performerID: tbl_reg_performer['id'],
    performerInput: Partial<PerformerInput>,
  ) {
    return this.prisma.tbl_reg_performer.update({
      where: { id: performerID },
      data: { ...performerInput },
    })
  }

  remove(performerID: tbl_reg_performer['id']) {
    return this.prisma.tbl_reg_performer.delete({
      where: { id: performerID },
    })
  }
}
