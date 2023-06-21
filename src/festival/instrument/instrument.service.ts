import { Injectable } from '@nestjs/common'
import { tbl_instruments } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class InstrumentService {
  constructor(private prisma: PrismaService) {}

  async create(instrument: Partial<tbl_instruments>) {
    return {
      userErrors: [],
      instrument: await this.prisma.tbl_instruments.create({
        data: {
          ...instrument,
        },
      }),
    }
  }

  async findAll() {
    return await this.prisma.tbl_instruments.findMany()
  }

  async findOne(id: tbl_instruments['id']) {
    return await this.prisma.tbl_instruments.findUnique({
      where: { id },
    })
  }

  async update(
    instrumentID: tbl_instruments['id'],
    instrument: Partial<tbl_instruments>
  ) {
    return {
      userErrors: [],
      instrument: await this.prisma.tbl_instruments.update({
        where: {
          id: instrumentID,
        },
        data: {
          ...instrument,
        },
      }),
    }
  }

  async remove(id: tbl_instruments['id']) {
    return {
      userErrors: [],
      instrument: await this.prisma.tbl_instruments.delete({
        where: { id },
      }),
    }
  }
}
