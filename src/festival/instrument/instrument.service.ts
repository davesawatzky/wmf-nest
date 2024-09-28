import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { tbl_instrument } from '@prisma/client'
import { InstrumentInput } from './dto/instrument.input'

@Injectable()
export class InstrumentService {
  constructor(private prisma: PrismaService) {}

  async create(instrumentInput: InstrumentInput) {
    let instrument: tbl_instrument
    let userErrors: UserError[]
    try {
      userErrors = []
      instrument = await this.prisma.tbl_instrument.create({
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
      return await this.prisma.tbl_instrument.findMany({
        where: {
          disciplineID,
        },
        orderBy: {
          name: 'asc',
        },
      })
    }
    else {
      return await this.prisma.tbl_instrument.findMany({
        orderBy: {
          name: 'asc',
        },
      })
    }
  }

  async findOne(id?: tbl_instrument['id'], name?: tbl_instrument['name']) {
    if (id) {
      return await this.prisma.tbl_instrument.findUnique({
        where: { id },
      })
    }
    else if (name) {
      return await this.prisma.tbl_instrument.findFirst({
        where: { name },
      })
    }
  }

  async update(
    instrumentID: tbl_instrument['id'],
    inst: Partial<tbl_instrument>,
  ) {
    let instrument: tbl_instrument
    let userErrors: UserError[]
    try {
      userErrors = []
      instrument = await this.prisma.tbl_instrument.update({
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

  async remove(id: tbl_instrument['id']) {
    let instrument: tbl_instrument
    let userErrors: UserError[]
    try {
      userErrors = []
      instrument = await this.prisma.tbl_instrument.delete({
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
