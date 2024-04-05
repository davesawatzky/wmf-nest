import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { DisciplineInput } from './dto/discipline.input'
import { tbl_discipline } from '@prisma/client'
import { PerformerType } from '../../common.entity'
import { Instrument } from '../instrument/entities/instrument.entity'
import {Discipline, DisciplinePayload} from './entities/discipline.entity'
import { UserError } from '../../common.entity'

@Injectable()
export class DisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(disciplineInput: DisciplineInput):Promise<DisciplinePayload> {
    let discipline: Discipline
    let userErrors: UserError[]
    try{
      userErrors = [],
      discipline = await this.prisma.tbl_discipline.create({
        data: { ...disciplineInput },
      })
    } catch (error:any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Discipline already exists',
            field: ['name']
          }
        ]
        discipline = null
      } else {
        userErrors = [
          {
            message: 'Cannot create discipline',
            field: []
          }
        ]
        discipline = null
      }
    }
    return {
      userErrors,
      discipline
    }
  }

  async findAll(
    performerType?: PerformerType | null,
    instrument?: Instrument['name'] | null
  ):Promise<Discipline[]> {
    if (!!performerType && !instrument) {
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
    } else if (!!instrument && !performerType) {
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
    } else if (!!instrument && !!performerType) {
      return await this.prisma.tbl_discipline.findMany({
        where: {
          tbl_instruments: {
            some: {
              name: instrument,
            },
          },
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
    } else if (!performerType && !instrument) {
      return await this.prisma.tbl_discipline.findMany({})
    }
  }

  async findOne(id: tbl_discipline['id']):Promise<Discipline> {
    return await this.prisma.tbl_discipline.findUnique({
      where: { id },
    })
  }

  async update(
    id: tbl_discipline['id'],
    DisciplineInput: Partial<tbl_discipline>
  ):Promise<DisciplinePayload> {
    let discipline: Discipline
    let userErrors: UserError[]
    try {
      userErrors = []
      discipline = await this.prisma.tbl_discipline.update({
        where: { id },
        data: { ...DisciplineInput },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Discipline details to update not found',
            field: ['id']
          }
        ]
        discipline = null
      } else {
        userErrors = [
          {
            message: 'Cannot update discipline',
            field: []
          }
        ]
        discipline =null
      }
    }
    return {
      userErrors,
      discipline
    }
  }

  async remove(disciplineID: tbl_discipline['id']):Promise<DisciplinePayload> {
    let discipline: Discipline
    let userErrors: UserError[]
    try {
      userErrors = []
      discipline = await this.prisma.tbl_discipline.delete({
        where: { id: disciplineID },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Discipline to delete not found',
            field: ['id']
          }
        ]
        discipline = null
      } else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot delete discipline',
            field: []
          }
        ]
        discipline =null
      }
    }
    return {
      userErrors,
      discipline
    }
  }
}
