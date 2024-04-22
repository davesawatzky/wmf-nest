import { Injectable } from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { LevelInput } from './dto/level.input'
import { PrismaService } from '@/prisma/prisma.service'
import { UserError } from '@/common.entity'
// import { CreateLevelInput } from './dto/create-level.input'
// import { UpdateLevelInput } from './dto/update-level.input'

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}

  async create(levelInput: LevelInput) {
    let level: tbl_level
    let userErrors: UserError[]
    try {
      userErrors = []
      level = await this.prisma.tbl_level.create({
        data: { ...levelInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Level name already exists',
            field: ['name'],
          },
        ]
        level = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot create level',
            field: [],
          },
        ]
        level = null
      }
    }
    return {
      userErrors,
      level,
    }
  }

  async findAll(
    categoryID?: tbl_category['id'],
    subdisciplineID?: tbl_subdiscipline['id'],
  ) {
    return await this.prisma.tbl_level.findMany({
      where: {
        tbl_classlist: {
          some: {
            categoryID,
            subdisciplineID,
          },
        },
      },
    })
  }

  async findOne(id: tbl_level['id']) {
    return await this.prisma.tbl_level.findUnique({
      where: { id },
    })
  }

  async update(id: tbl_level['id'], levelInput: LevelInput) {
    let level: tbl_level
    let userErrors: UserError[]
    try {
      userErrors = []
      level = await this.prisma.tbl_level.update({
        where: { id },
        data: { ...levelInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Level details to update not found',
            field: ['id'],
          },
        ]
        level = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update level',
            field: [],
          },
        ]
        level = null
      }
    }
    return {
      userErrors,
      level,
    }
  }

  async remove(id: tbl_level['id']) {
    let level: tbl_level
    let userErrors: UserError[]
    try {
      userErrors = []
      level = await this.prisma.tbl_level.delete({
        where: { id },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Level to delete not found',
            field: ['id'],
          },
        ]
        level = null
      }
      else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot delete level',
            field: [],
          },
        ]
        level = null
      }
    }
    return {
      userErrors,
      level,
    }
  }
}
