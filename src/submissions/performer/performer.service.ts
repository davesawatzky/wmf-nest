import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_performer } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { PerformerInput } from './dto/performer.input'
import {UserError} from '@/common.entity'

@Injectable()
export class PerformerService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    performerInput?: Partial<PerformerInput>
  ) {
    let performer: tbl_reg_performer
    let userErrors: UserError[]
    try {
      userErrors = [],
      performer = await this.prisma.tbl_reg_performer.create({
        data: { regID: registrationID, ...performerInput },
      })
    } catch (error: any) {
      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot create performer. Missing registration',
            field: ['registrationId']
          }
        ]
        performer = null
      } else {
        userErrors = [
          {
            message: 'Cannot create performer',
            field: []
          }
        ]
        performer = null
      }
    }
    return { userErrors, performer }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    return await this.prisma.tbl_reg_performer.findMany({
      where: { regID: registrationID },
    })
  }

  async findOne(
    performerID: tbl_reg_performer['id']) {
    return await this.prisma.tbl_reg_performer.findUnique({
      where: {
        id: performerID
      },
    })
  }

  async update(
    performerID: tbl_reg_performer['id'],
    performerInput: Partial<PerformerInput>
  ) {
    let userErrors: UserError[]
    let performer: tbl_reg_performer
    try {
      userErrors = [],
      performer = await this.prisma.tbl_reg_performer.update({
        where: { id: performerID },
        data: { ...performerInput },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Performer to update not found',
            field: ['id']
          }
        ]
        performer = null
      } else {
        userErrors = [
          {
            message: 'Cannot update performer',
            field: []
          }
        ]
        performer = null
      }
    }
    return { userErrors, performer }
  }

  async remove(performerID: tbl_reg_performer['id']) {
    let userErrors: UserError[]
    let performer: tbl_reg_performer
    try {
      userErrors = [],
      performer = await this.prisma.tbl_reg_performer.delete({
        where: { id: performerID },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Performer to delete not found',
            field: ['id']
          }
        ]
        performer = null
      } else {
        userErrors = [
          {
            message: 'Cannot delete performer',
            field: []
          }
        ]
        performer = null
      }
    }
    return { userErrors, performer }
  }
}
