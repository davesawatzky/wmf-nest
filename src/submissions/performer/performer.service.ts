import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { tbl_reg_class, tbl_reg_performer, tbl_registration } from '@prisma/client'
import { PerformerInput } from './dto/performer.input'

@Injectable()
export class PerformerService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    performerInput?: Partial<PerformerInput>,
  ) {
    let performer: tbl_reg_performer
    let userErrors: UserError[]
    try {
      userErrors = []
      performer = await this.prisma.tbl_reg_performer.create({
        data: { regID: registrationID, ...performerInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot create performer. Missing registration',
            field: ['registrationId'],
          },
        ]
        performer = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot create performer',
            field: [],
          },
        ]
        performer = null
      }
    }
    return { userErrors, performer }
  }

  async findAll(
    registrationID?: tbl_registration['id'],
    classNumber?: tbl_reg_class['classNumber'],
  ) {
    if (registrationID) {
      return await this.prisma.tbl_reg_performer.findMany({
        where: { regID: registrationID },
      })
    }
    else if (classNumber) {
      const registeredClassIds = await this.prisma.tbl_reg_class.findMany({
        where: {
          classNumber,
        },
        select: { regID: true },
      })
      const performerIds = registeredClassIds.map(item => item.regID).filter(item => !!item)
      return await this.prisma.tbl_reg_performer.findMany({
        where: {
          regID: { in: performerIds },
        },
      })
    }
    else {
      const confirmedRegistrations = await this.prisma.tbl_registration.findMany({
        where: {
          confirmation: {
            not: null,
          },
        },
      })
      const performerIds = confirmedRegistrations.map(item => item.id)
      return await this.prisma.tbl_reg_performer.findMany({
        where: {
          regID: { in: performerIds },
        },
      })
    }
  }

  async findOne(
    performerID: tbl_reg_performer['id'],
  ) {
    return await this.prisma.tbl_reg_performer.findUnique({
      where: {
        id: performerID,
      },
    })
  }

  async update(
    performerID: tbl_reg_performer['id'],
    performerInput: Partial<PerformerInput>,
  ) {
    let userErrors: UserError[]
    let performer: tbl_reg_performer
    try {
      userErrors = []
      performer = await this.prisma.tbl_reg_performer.update({
        where: { id: performerID },
        data: { ...performerInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Performer to update not found',
            field: ['id'],
          },
        ]
        performer = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update performer',
            field: [],
          },
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
      userErrors = []
      performer = await this.prisma.tbl_reg_performer.delete({
        where: { id: performerID },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Performer to delete not found',
            field: ['id'],
          },
        ]
        performer = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete performer',
            field: [],
          },
        ]
        performer = null
      }
    }
    return { userErrors, performer }
  }
}
