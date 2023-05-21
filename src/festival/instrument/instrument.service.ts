import { Injectable } from '@nestjs/common'
import { tbl_instruments } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class InstrumentService {
  constructor(private prisma: PrismaService) {}

  create(instrument: Partial<tbl_instruments>) {
    return this.prisma.tbl_instruments.create({
      data: {
        ...instrument,
      },
    })
  }

  findAll() {
    return this.prisma.tbl_instruments.findMany()
  }

  findOne(id: tbl_instruments['id']) {
    return this.prisma.tbl_instruments.findUnique({
      where: { id },
    })
  }

  update(
    instrumentID: tbl_instruments['id'],
    instrument: Partial<tbl_instruments>
  ) {
    return this.prisma.tbl_instruments.update({
      where: {
        id: instrumentID,
      },
      data: {
        ...instrument,
      },
    })
  }

  remove(id: tbl_instruments['id']) {
    return this.prisma.tbl_instruments.delete({
      where: { id },
    })
  }
}
