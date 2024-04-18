import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_group } from '@prisma/client'
import { GroupInput } from './dto/group.input'
import { PrismaService } from '../../prisma/prisma.service'
import {UserError} from '@/common.entity'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(registrationID: tbl_registration['id']) {
    let group: tbl_reg_group
    let userErrors: UserError[]

    try {
      userErrors = [],
      group = await this.prisma.tbl_reg_group.create({
        data: {
          regID: registrationID,
        },
      })
    } catch (error: any) {
      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot create group. Missing registration',
            field: ['registrationId']
          }
        ]
        group = null
      } else {
        userErrors = [
          {
            message: 'Cannot create group',
            field: []
          }
        ]
        group = null
      }
    }
    return {
      userErrors,
      group,
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    return await this.prisma.tbl_reg_group.findMany({
      where: { regID: registrationID },
    })
  }

  async findOne(
    registrationID?: tbl_registration['id'],
    groupID?: tbl_reg_group['id']) {
    return await this.prisma.tbl_reg_group.findUnique({
      where: {
        regID: registrationID ?? undefined,
        id: groupID ?? undefined
       },
    })
  }

  async update(groupID: tbl_reg_group['id'], groupInput: Partial<GroupInput>) {
    let userErrors: UserError[]
    let group: tbl_reg_group
    try {
      userErrors = [],
      group = await this.prisma.tbl_reg_group.update({
        where: { id: groupID },
        data: { ...groupInput },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Group to update not found',
            field: ['id']
          }
        ]
        group = null
      } else {
        userErrors = [
          {
            message: 'Cannot update group',
            field: []
          }
        ]
        group = null
      }
    }
    return {
      userErrors,
      group
    }
  }

  async remove(groupID: tbl_reg_group['id']) {
    let userErrors: UserError[]
    let group: tbl_reg_group

    try {
      userErrors = [],
      group = await this.prisma.tbl_reg_group.delete({
        where: { id: groupID },
      })
    } catch (error: any) {
      if(error.code === 'P2025') {
        userErrors = [
          {
            message: 'Group to delete not found',
            field: ['id']
          }
        ]
        group = null
      } else {
        userErrors = [
          {
            message: 'Cannot delete group',
            field: []
          }
        ]
        group =null
      }
    }
    return {
      userErrors,
      group
    }
  }
}
