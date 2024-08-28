import { Injectable } from '@nestjs/common'
import { tbl_user } from '@prisma/client'
import { UserInput } from './dto/user.input'
import { User } from './entities/user.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { UserError } from '@/common.entity'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tbl_user.findMany()
  }

  async findOne(userID?: tbl_user['id'], email?: tbl_user['email']) {
    let response: tbl_user
    if (userID) {
      response = await this.prisma.tbl_user.findUnique({
        where: { id: userID },
      })
    }
    else if (email) {
      response = await this.prisma.tbl_user.findUnique({
        where: { email },
      })
    }
    if (Object.prototype.hasOwnProperty.call(response, 'password')) {
      const { password, ...user } = response
      return user
    }
    else {
      const { ...user } = response
      return user
    }
  }

  async update(userID: tbl_user['id'], userInput: UserInput) {
    let user: User
    let userErrors: UserError[]

    try {
      userErrors = []
      user = await this.prisma.tbl_user.update({
        where: { id: userID },
        data: { ...userInput },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'User not found',
            field: ['id', 'email'],
          },
        ]
        user = null
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Email address is already taken',
            field: ['email'],
          },
        ]
        user = null
      }
    }
    return {
      userErrors,
      user,
    }
  }

  async remove(userID: tbl_user['id']) {
    let user: User
    let userErrors: UserError[]

    try {
      userErrors = []
      user = await this.prisma.tbl_user.delete({
        where: { id: userID },
      })
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'User not found',
            field: ['id', 'email'],
          },
        ]
        user = null
      }
    }
    return {
      userErrors,
      user,
    }
  }
}
