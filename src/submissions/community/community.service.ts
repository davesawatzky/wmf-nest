import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { tbl_reg_community, tbl_registration } from '@prisma/client'
import { CommunityInput } from './dto/community.input'

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    communityInput?: Partial<CommunityInput>,
  ) {
    let community: tbl_reg_community
    let userErrors: UserError[]

    try {
      userErrors = []
      community = await this.prisma.tbl_reg_community.create({
        data: { regID: registrationID, ...communityInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot create community. Missing registration',
            field: ['registrationId'],
          },
        ]
        community = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot create community',
            field: [],
          },
        ]
        community = null
      }
    }
    return {
      userErrors,
      community,
    }
  }

  async findAll() {
    return await this.prisma.tbl_reg_community.findMany()
  }

  async findOne(
    registrationID?: tbl_reg_community['id'],
    communityID?: tbl_reg_community['id'],
  ) {
    return await this.prisma.tbl_reg_community.findUnique({
      where: {
        regID: registrationID ?? undefined,
        id: communityID ?? undefined,
      },
    })
  }

  async update(
    communityID: tbl_reg_community['id'],
    communityInput: Partial<CommunityInput>,
  ) {
    let community: tbl_reg_community
    let userErrors: UserError[]
    try {
      userErrors = []
      community = await this.prisma.tbl_reg_community.update({
        where: { id: communityID },
        data: { ...communityInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Community to update not found',
            field: ['id'],
          },
        ]
        community = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot update community',
            field: [],
          },
        ]
        community = null
      }
    }
    return {
      userErrors,
      community,
    }
  }

  async remove(communityID: tbl_reg_community['id']) {
    let community: tbl_reg_community
    let userErrors: UserError[]

    try {
      userErrors = []
      community = await this.prisma.tbl_reg_community.delete({
        where: { id: communityID },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Community to delete not found',
            field: ['id'],
          },
        ]
        community = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete community',
            field: [],
          },
        ]
        community = null
      }
    }
    return {
      userErrors,
      community,
    }
  }
}
