import { Injectable } from '@nestjs/common'
import {
  tbl_subdiscipline,
  tbl_category,
  tbl_level,
  tbl_discipline,
} from '@prisma/client'
import { SubdisciplineInput } from './dto/subdiscipline.input'
import { PrismaService } from '../../prisma/prisma.service'
import { PerformerType, UserError } from '../../common.entity'
import {Subdiscipline, SubdisciplinePayload} from './entities/subdiscipline.entity'

@Injectable()
export class SubdisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(
    subdisciplineInput: SubdisciplineInput
  ):Promise<SubdisciplinePayload> {
    let subdiscipline: Subdiscipline
    let userErrors: UserError[]
    try {
      userErrors = [],
      subdiscipline = await this.prisma.tbl_subdiscipline.create({
        data: {
          ...subdisciplineInput,
        },
      })
    } catch (error:any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Subdiscipline already exists',
            field: ['name']
          }
        ]
        subdiscipline = null
      } else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot create subdiscipline',
            field: []
          }
        ]
        subdiscipline = null
      }
    }
    return {
      userErrors,
      subdiscipline
    }
  }

  async findAll(
    disciplineID?: tbl_discipline['id'],
    performerType?: PerformerType
  ) {
    return await this.prisma.tbl_subdiscipline.findMany({
      where: {
        performerType: performerType ?? undefined,
        disciplineID: disciplineID ?? undefined
      },
    })
  }

  async findOne(id: tbl_subdiscipline['id']) {
    return await this.prisma.tbl_subdiscipline.findUnique({
      where: { id },
    })
  }

  async update(
    id: tbl_subdiscipline['id'],
    subdisciplineInput: SubdisciplineInput
  ): Promise<SubdisciplinePayload> {
    let subdiscipline: Subdiscipline
    let userErrors: UserError[]
    try {
      userErrors = []
      subdiscipline = await this.prisma.tbl_subdiscipline.update({
        where: { id },
        data: { ...subdisciplineInput },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Subdiscipline details to update not found',
            field: ['id']
          }
        ]
        subdiscipline = null
      } else {
        userErrors = [
          {
            message: 'Cannot update subdiscipline',
            field: []
           }
        ]
        subdiscipline = null
      }
    }
    return {
      userErrors,
      subdiscipline
    }
  }

  async remove(id: tbl_subdiscipline['id']):Promise<SubdisciplinePayload> {
    let subdiscipline: Subdiscipline
    let userErrors: UserError[]
    try {
      userErrors = [],
      subdiscipline = await this.prisma.tbl_subdiscipline.delete({
        where: { id },
      })
    } catch (error: any) {
    if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Subdiscipline details to delete not found',
            field: ['id']
          }
        ]
        subdiscipline = null
      } else {
        userErrors = [
          {
            message: 'Cannot delete subdiscipline',
            field: []
           }
        ]
        subdiscipline = null
      }
    }
    return {
      userErrors,
      subdiscipline
    }
  }
}
