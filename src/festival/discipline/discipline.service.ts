import { PerformerType, UserError } from '@/common.entity'
import { Instrument } from '@/festival/instrument/entities/instrument.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { tbl_discipline } from '@prisma/client'
import { DisciplineInput } from './dto/discipline.input'

@Injectable()
export class DisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(disciplineInput: DisciplineInput) {
    let discipline: tbl_discipline
    let userErrors: UserError[]
    try {
      userErrors = []
      discipline = await this.prisma.tbl_discipline.create({
        data: { ...disciplineInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Discipline already exists',
            field: ['name'],
          },
        ]
        discipline = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot create discipline',
            field: [],
          },
        ]
        discipline = null
      }
    }
    return {
      userErrors,
      discipline,
    }
  }

  async findAll(
    performerType?: PerformerType | null,
    instrument?: Instrument['name'] | null,
  ) {
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
    }
    else if (!!instrument && !performerType) {
      return await this.prisma.tbl_discipline.findMany({
        where: {
          tbl_instrument: {
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
    else if (!!instrument && !!performerType) {
      return await this.prisma.tbl_discipline.findMany({
        where: {
          tbl_instrument: {
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
    }
    else if (!performerType && !instrument) {
      return await this.prisma.tbl_discipline.findMany({})
    }
  }

  async findOne(id: tbl_discipline['id']) {
    return await this.prisma.tbl_discipline.findUnique({
      where: { id },
    })
  }

  async update(
    id: tbl_discipline['id'],
    DisciplineInput: Partial<tbl_discipline>,
  ) {
    let discipline: tbl_discipline
    let userErrors: UserError[]
    try {
      userErrors = []
      discipline = await this.prisma.tbl_discipline.update({
        where: { id },
        data: { ...DisciplineInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Discipline details to update not found',
            field: ['id'],
          },
        ]
        discipline = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update discipline',
            field: [],
          },
        ]
        discipline = null
      }
    }
    return {
      userErrors,
      discipline,
    }
  }

  async remove(disciplineID: tbl_discipline['id']) {
    let discipline: tbl_discipline
    let userErrors: UserError[]
    try {
      userErrors = []
      discipline = await this.prisma.tbl_discipline.delete({
        where: { id: disciplineID },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Discipline to delete not found',
            field: ['id'],
          },
        ]
        discipline = null
      }
      else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot delete discipline',
            field: [],
          },
        ]
        discipline = null
      }
    }
    return {
      userErrors,
      discipline,
    }
  }
}
