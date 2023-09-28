import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserInput } from './dto/user.input'
import { tbl_user } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tbl_user.findMany()
  }

  async findOne(userID?: tbl_user['id'], email?: tbl_user['email']) {
    if (userID) {
      return await this.prisma.tbl_user.findUnique({
        where: { id: userID },
      })
    } else if (email) {
      return await this.prisma.tbl_user.findUnique({
        where: { email },
      })
    }
  }

  async update(userID: tbl_user['id'], userInput: UserInput) {
    return {
      userErrors: [],
      user: await this.prisma.tbl_user.update({
        where: { id: userID },
        data: { ...userInput },
      }),
    }
  }

  async remove(id: tbl_user['id']) {
    return {
      userErrors: [],
      user: await this.prisma.tbl_user.delete({
        where: { id },
      }),
    }
  }
}
