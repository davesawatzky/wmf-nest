import { Injectable } from '@nestjs/common'
import { tbl_instruments } from '@prisma/client'
import { InstrumentInput } from './dto/instrument.input'
import { PrismaService } from '@/prisma/prisma.service'
import { UserError } from '@/common.entity'

@Injectable()
export class InstrumentService {
  constructor(private prisma: PrismaService) {}

  async create(instrumentInput: InstrumentInput) {
    let instrument: tbl_instruments
    let userErrors: UserError[]
    try {
      userErrors = []
      instrument = await this.prisma.tbl_instruments.create({
        data: { ...instrumentInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Instrument already exists',
            field: ['name'],
          },
        ]
        instrument = null
      }
      else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot create instrument',
            field: [],
          },
        ]
        instrument = null
      }
    }
    return {
      userErrors,
      instrument,
    }
  }

  async findAll(disciplineID?: number) {
    if (disciplineID) {
      return await this.prisma.tbl_instruments.findMany({
        where: {
          disciplineID,
        },
        orderBy: {
          name: 'asc',
        },
      })
    }
    else {
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
    }
    else if (name) {
      return await this.prisma.tbl_instruments.findFirst({
        where: { name },
      })
    }
  }

  async update(
    instrumentID: tbl_instruments['id'],
    inst: Partial<tbl_instruments>,
  ) {
    let instrument: tbl_instruments
    let userErrors: UserError[]
    try {
      userErrors = []
      instrument = await this.prisma.tbl_instruments.update({
        where: {
          id: instrumentID,
        },
        data: {
          ...inst,
        },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Instrument to update not found',
            field: ['id'],
          },
        ]
        instrument = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update instrument',
            field: [],
          },
        ]
        instrument = null
      }
    }
    return {
      userErrors,
      instrument,
    }
  }

  async remove(id: tbl_instruments['id']) {
    let instrument: tbl_instruments
    let userErrors: UserError[]
    try {
      userErrors = []
      instrument = await this.prisma.tbl_instruments.delete({
        where: { id },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Instrument to delete not found',
            field: ['id'],
          },
        ]
        instrument = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete instrument',
            field: [],
          },
        ]
        instrument = null
      }
    }
    return {
      userErrors,
      instrument,
    }
  }
}
