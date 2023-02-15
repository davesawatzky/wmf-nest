import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_community } from '@prisma/client'
import { CommunityInput } from 'src/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
// import { CreateCommunityInput } from './dto/create-community.input'
// import { UpdateCommunityInput } from './dto/update-community.input'

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    communityInput: Partial<CommunityInput>,
  ) {
    return await this.prisma.tbl_reg_community.create({
      data: {
        regID: registrationID,
        ...communityInput,
      },
    })
  }

  findAll(registrationOrSchoolID?: tbl_registration['id']) {
    return this.prisma.tbl_reg_community.findMany({
      where: { regID: registrationOrSchoolID },
    })
  }

  findOne(communityID: tbl_reg_community['id']) {
    return this.prisma.tbl_reg_community.findUnique({
      where: { id: communityID },
    })
  }

  update(
    communityID: tbl_reg_community['id'],
    communityInput: Partial<CommunityInput>,
  ) {
    return this.prisma.tbl_reg_community.update({
      where: { id: communityID },
      data: { ...communityInput },
    })
  }

  remove(communityID: tbl_reg_community['id']) {
    return this.prisma.tbl_reg_community.delete({
      where: { id: communityID },
    })
  }
}
