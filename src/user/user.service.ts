import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserInput } from './dto/user.input'
import { tbl_user } from '@prisma/client'
import {UserError} from '@/common.entity'
import {User} from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tbl_user.findMany()
  }

  async findOne(userID?: tbl_user['id'], email?: tbl_user['email']) {
    let response
    if (userID) {
      response = await this.prisma.tbl_user.findUnique({
        where: { id: userID },
      })
    } else if (email) {
      response = await this.prisma.tbl_user.findUnique({
        where: { email },
      })
    }
    const {password, ...user} = response
    return user
  }

  async update(userID: tbl_user['id'], userInput: UserInput) {
    let user: User
    let userErrors: UserError[]
    
    try {
      userErrors = []
        user = await this.prisma.tbl_user.update({
          where: {id: userID},
          data: {...userInput},
        })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
          message: 'User not found',
          field: ['id', 'email']
          }
        ]
        user = null
      } else if (error.code === 'P2002') {
        userErrors = [
          {
          message: 'Email address is already taken',
          field: ['email']
          }
        ]
        user = null
      }
   }
    return {
      userErrors, user
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
