import { PerformerType, UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'

import { Injectable } from '@nestjs/common'
import {
  tbl_discipline,
  tbl_subdiscipline,
} from '@prisma/client'
import { SubdisciplineInput } from './dto/subdiscipline.input'

@Injectable()
export class SubdisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(
    subdisciplineInput: SubdisciplineInput,
  ) {
    let subdiscipline: tbl_subdiscipline
    let userErrors: UserError[]
    try {
      userErrors = []
      subdiscipline = await this.prisma.tbl_subdiscipline.create({
        data: {
          ...subdisciplineInput,
        },
      })
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Subdiscipline already exists',
            field: ['name'],
          },
        ]
        subdiscipline = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot create subdiscipline',
            field: [],
          },
        ]
        subdiscipline = null
      }
    }
    return {
      userErrors,
      subdiscipline,
    }
  }

  async findAll(
    disciplineID?: tbl_discipline['id'] | null,
    performerType?: PerformerType | null,
  ) {
    return await this.prisma.tbl_subdiscipline.findMany({
      where: {
        performerType: performerType ?? undefined,
        disciplineID: disciplineID ?? undefined,
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
    subdisciplineInput: SubdisciplineInput,
  ) {
    let subdiscipline: tbl_subdiscipline
    let userErrors: UserError[]
    try {
      userErrors = []
      subdiscipline = await this.prisma.tbl_subdiscipline.update({
        where: { id },
        data: { ...subdisciplineInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Subdiscipline details to update not found',
            field: ['id'],
          },
        ]
        subdiscipline = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update subdiscipline',
            field: [],
          },
        ]
        subdiscipline = null
      }
    }
    return {
      userErrors,
      subdiscipline,
    }
  }

  async remove(id: tbl_subdiscipline['id']) {
    let subdiscipline: tbl_subdiscipline
    let userErrors: UserError[]
    try {
      userErrors = []
      subdiscipline = await this.prisma.tbl_subdiscipline.delete({
        where: { id },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Subdiscipline details to delete not found',
            field: ['id'],
          },
        ]
        subdiscipline = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete subdiscipline',
            field: [],
          },
        ]
        subdiscipline = null
      }
    }
    return {
      userErrors,
      subdiscipline,
    }
  }
}
