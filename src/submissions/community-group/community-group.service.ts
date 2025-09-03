import { Injectable } from '@nestjs/common'
import { tbl_reg_community, tbl_reg_communitygroup } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { CommunityGroupInput } from './dto/community-group.input'

@Injectable()
export class CommunityGroupService {
  constructor(private prisma: PrismaService) {}

  async create(
    communityID: tbl_reg_community['id'],
    communityGroupInput?: Partial<CommunityGroupInput>,
  ) {
    let communityGroup: tbl_reg_communitygroup
    let userErrors: UserError[]
    try {
      userErrors = []
      communityGroup = await this.prisma.tbl_reg_communitygroup.create({
        data: { communityID, ...communityGroupInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot create community group. Missing community ID',
            field: ['communityId'],
          },
        ]
        communityGroup = null
      }
      else {
        console.error(error)
        userErrors = [
          {
            message: 'Cannot create community group',
            field: [],
          },
        ]
        communityGroup = null
      }
    }
    return {
      userErrors,
      communityGroup,
    }
  }

  async findAll(communityID?: tbl_reg_communitygroup['communityID']) {
    return await this.prisma.tbl_reg_communitygroup.findMany({
      where: { communityID },
    })
  }

  async findOne(communityGroupID: tbl_reg_communitygroup['id']) {
    return await this.prisma.tbl_reg_communitygroup.findUnique({
      where: { id: communityGroupID },
    })
  }

  async update(
    communityGroupID: tbl_reg_communitygroup['id'],
    communityGroupInput: Partial<CommunityGroupInput>,
  ) {
    let userErrors: UserError[]
    let communityGroup: tbl_reg_communitygroup

    try {
      userErrors = []
      communityGroup = await this.prisma.tbl_reg_communitygroup.update({
        where: { id: communityGroupID },
        data: { ...communityGroupInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Community group to update not found',
            field: ['id'],
          },
        ]
        communityGroup = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update community group',
            field: [],
          },
        ]
        communityGroup = null
      }
    }
    return {
      userErrors,
      communityGroup,
    }
  }

  async remove(communityGroupID: tbl_reg_communitygroup['id']) {
    let userErrors: UserError[]
    let communityGroup: tbl_reg_communitygroup

    try {
      userErrors = []
      communityGroup = await this.prisma.tbl_reg_communitygroup.delete({
        where: { id: communityGroupID },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Community group to delete not found',
            field: ['id'],
          },
        ]
        communityGroup = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete community group',
            field: [],
          },
        ]
        communityGroup = null
      }
    }
    return {
      userErrors,
      communityGroup,
    }
  }
}
