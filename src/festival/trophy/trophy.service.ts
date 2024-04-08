import { Injectable } from '@nestjs/common'
import { tbl_trophy } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { TrophyInput } from './dto/trophy.input'
import {UserError} from 'src/common.entity'
import { Trophy } from './entities/trophy.entity'

@Injectable()
export class TrophyService {
  constructor(private prisma: PrismaService) {}

  async create(trophyInput: TrophyInput) {
    let trophy: tbl_trophy
    let userErrors: UserError[]
    try {
      userErrors = [],
        trophy = await this.prisma.tbl_trophy.create({
          data: {...trophyInput},
        })
    } catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Trophy name already exists',
            field: ['name']
          }
        ]
        trophy = null
      } else {
        userErrors = [
          {
            message: 'Cannot create trophy',
            field: []
          }
        ]
        trophy = null
      }
    }
      return {
        userErrors,
        trophy
    }
  }

  async findAll() {
    return await this.prisma.tbl_trophy.findMany()
  }

  async findTrophyClasses(trophyID: tbl_trophy['id']) {
    return await this.prisma.tbl_classlist.findMany({
      where: {
        tbl_class_trophy: {
          some: {
            trophyID: trophyID,
          },
        },
      },
    })
  }

  async findOne(id: tbl_trophy['id']) {
    let response: any
    return await this.prisma.tbl_trophy.findUnique({
        where: {id}
      })
  }

  async update(id: tbl_trophy['id'], trophyInput: TrophyInput) {
    let trophy: tbl_trophy
    let userErrors: UserError[]
    try {
      userErrors = [],
      trophy = await this.prisma.tbl_trophy.update({
        where: { id },
        data: { ...trophyInput },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Trophy to update not found',
            field: ['id']
          }
        ]
        trophy = null
      } else {
        userErrors = [
          {
            message: 'Cannot update trophy',
            field: []
          }
        ]
        trophy = null
      }
    }
    return {
      userErrors,
      trophy
    }
  }

  async remove(id: tbl_trophy['id']) {
    let trophy: tbl_trophy
    let userErrors: UserError[]
    try {
      userErrors = [],
      trophy = await this.prisma.tbl_trophy.delete({
        where: { id },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Trophy to delete not found',
            field: ['id']
          }
        ]
        trophy = null
      } else {
        userErrors = [
          {
            message: 'Cannot delete level',
            field: []
          }
        ]
        trophy = null
      }
    }
    return {
      userErrors,
      trophy
    }
  }
}
