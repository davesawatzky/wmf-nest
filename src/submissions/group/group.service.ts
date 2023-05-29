import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_reg_group } from '@prisma/client'
import { GroupInput } from './dto/group.input'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(registrationID: tbl_registration['id']) {
    return {
      userErrors: [],
      group: await this.prisma.tbl_reg_group.create({
        data: {
          regID: registrationID,
        },
      }),
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    return await this.prisma.tbl_reg_group.findMany({
      where: { regID: registrationID },
    })
  }

  async findOne(registrationID: tbl_registration['id']) {
    return await this.prisma.tbl_reg_group.findUnique({
      where: { regID: registrationID },
    })
  }

  async update(groupID: tbl_reg_group['id'], groupInput: Partial<GroupInput>) {
    return {
      userErrors: [],
      group: await this.prisma.tbl_reg_group.update({
        where: { id: groupID },
        data: { ...groupInput },
      }),
    }
  }

  async remove(groupID: tbl_reg_group['id']) {
    return {
      userErrors: [],
      group: await this.prisma.tbl_reg_group.delete({
        where: { id: groupID },
      }),
    }
  }
}
