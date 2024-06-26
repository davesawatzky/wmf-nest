import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { DisciplineInput } from './dto/discipline.input'
import { tbl_discipline } from '@prisma/client'
import { PerformerType } from '../../common.entity'
import { Instrument } from '../instrument/entities/instrument.entity'

@Injectable()
export class DisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(disciplineInput: DisciplineInput) {
    return {
      userErrors: [],
      discipline: await this.prisma.tbl_discipline.create({
        data: { ...disciplineInput },
      }),
    }
  }

  async findAll(
    performerType?: PerformerType,
    instrument?: Instrument['name']
  ) {
    if (!!performerType) {
      return await this.prisma.tbl_discipline.findMany({
        where: {
          tbl_subdiscipline: {
            some: {
              tbl_classlist: {
                some: {
                  performerType,
                },
              },
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      })
    } else if (!!instrument) {
      return await this.prisma.tbl_discipline.findMany({
        where: {
          tbl_instruments: {
            some: {
              name: instrument,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      })
    }
  }

  async findOne(id: tbl_discipline['id']) {
    return await this.prisma.tbl_discipline.findUnique({
      where: { id },
    })
  }

  async update(
    id: tbl_discipline['id'],
    DisciplineInput: Partial<tbl_discipline>
  ) {
    return {
      userErrors: [],
      discipline: await this.prisma.tbl_discipline.update({
        where: { id },
        data: { ...DisciplineInput },
      }),
    }
  }

  async remove(id: tbl_discipline['id']) {
    return {
      userErrors: [],
      discipline: await this.prisma.tbl_discipline.delete({
        where: { id },
      }),
    }
  }
}
