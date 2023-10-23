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

  async findAll(disciplineID?: number) {
    if (!!disciplineID) {
      return await this.prisma.tbl_instruments.findMany({
        where: {
          disciplineID,
        },
        orderBy: {
          name: 'asc',
        },
      })
    } else {
      return await this.prisma.tbl_instruments.findMany({
        orderBy: {
          name: 'asc',
        },
      })
    }
  }

  async findOne(id?: tbl_instruments['id'], name?: tbl_instruments['name']) {
    if (id) {
      return await this.prisma.tbl_instruments.findUnique({
        where: { id },
      })
    } else if (name) {
      return await this.prisma.tbl_instruments.findFirst({
        where: { name },
      })
    }
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
