import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserInput, UpdateUserInput, User } from 'src/graphql'
// import { CreateUserInput } from './dto/create-user.input'
// import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user'
  }

  async findAll() {
    return this.prisma.tbl_user.findMany()
  }

  async findOne(id: User['id']) {
    return this.prisma.tbl_user.findUnique({
      where: { id },
    })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  async remove(id: number) {
    return this.prisma.tbl_user.delete({
      where: { id },
    })
  }
}
