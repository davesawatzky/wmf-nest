import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_community } from '@prisma/client'
import { CommunityInput } from './dto/community.input'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(registrationID: tbl_registration['id']) {
    return {
      userErrors: [],
      community: await this.prisma.tbl_reg_community.create({
        data: { regID: registrationID },
      }),
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    return await this.prisma.tbl_reg_community.findMany({
      where: { regID: registrationID },
    })
  }

  async findOne(registrationID: tbl_reg_community['id']) {
    return await this.prisma.tbl_reg_community.findUnique({
      where: { regID: registrationID },
    })
  }

  async update(
    communityID: tbl_reg_community['id'],
    communityInput: Partial<CommunityInput>
  ) {
    return {
      userErrors: [],
      community: await this.prisma.tbl_reg_community.update({
        where: { id: communityID },
        data: { ...communityInput },
      }),
    }
  }

  async remove(communityID: tbl_reg_community['id']) {
    return {
      userErrors: [],
      community: await this.prisma.tbl_reg_community.delete({
        where: { id: communityID },
      }),
    }
  }
}
