import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_performer } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { PerformerInput } from './dto/performer.input'

@Injectable()
export class PerformerService {
  constructor(private prisma: PrismaService) {}

  async create(registrationID: tbl_registration['id']) {
    return {
      userErrors: [],
      performer: await this.prisma.tbl_reg_performer.create({
        data: { regID: registrationID },
      }),
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    return await this.prisma.tbl_reg_performer.findMany({
      where: { regID: registrationID },
    })
  }

  async findOne(performerID: tbl_reg_performer['id']) {
    return await this.prisma.tbl_reg_performer.findUnique({
      where: { id: performerID },
    })
  }

  async update(
    performerID: tbl_reg_performer['id'],
    performerInput: Partial<PerformerInput>
  ) {
    return {
      userErrors: [],
      performer: await this.prisma.tbl_reg_performer.update({
        where: { id: performerID },
        data: { ...performerInput },
      }),
    }
  }

  async remove(performerID: tbl_reg_performer['id']) {
    return {
      userErrors: [],
      performer: await this.prisma.tbl_reg_performer.delete({
        where: { id: performerID },
      }),
    }
  }
}
