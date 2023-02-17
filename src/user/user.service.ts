import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserInput, User } from 'src/graphql'
import { tbl_user } from '@prisma/client'
// import { CreateUserInput } from './dto/create-user.input'
// import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tbl_user.findMany()
  }

  async findOne(id: User['id']) {
    return this.prisma.tbl_user.findUnique({
      where: { id },
    })
  }

  async update(userID: User['id'], userInput: UserInput) {
    return this.prisma.tbl_user.update({
      where: { id: userID },
      data: { ...userInput },
    })
  }

  async remove(id: tbl_user['id']) {
    return this.prisma.tbl_user.delete({
      where: { id },
    })
  }
}
