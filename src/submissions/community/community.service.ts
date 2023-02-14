import { Injectable } from '@nestjs/common'
import { tbl_category, tbl_reg_community } from '@prisma/client'
import { Community, CommunityInput, Registration } from 'src/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
// import { CreateCommunityInput } from './dto/create-community.input'
// import { UpdateCommunityInput } from './dto/update-community.input'

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: Registration['id'],
    communityInput: CommunityInput,
  ) {
    return await this.prisma.tbl_reg_community.create({
      data: {
        regID: registrationID,
        ...communityInput,
      },
    })
  }

  findAll() {
    return `This action returns all community`
  }

  findOne(id: number) {
    return `This action returns a #${id} community`
  }

  update(id: number, community: CommunityInput) {
    return `This action updates a #${id} community`
  }

  remove(id: number) {
    return `This action removes a #${id} community`
  }
}
