import { Injectable } from '@nestjs/common'
import { Trophy, TrophyInput } from 'src/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
// import { CreateTrophyInput } from './dto/create-trophy.input'
// import { UpdateTrophyInput } from './dto/update-trophy.input'

@Injectable()
export class TrophyService {
  constructor(private prisma: PrismaService) {}

  async create(trophyInput: TrophyInput) {
    return this.prisma.tbl_trophy.create({
      data: {
        ...trophyInput,
      },
    })
  }

  async findAll() {
    return this.prisma.tbl_trophy.findMany()
  }

  async findTrophyClasses(trophyID: Trophy['id']) {
    return this.prisma.tbl_classlist.findMany({
      where: {
        tbl_class_trophy: {
          some: {
            trophyID: trophyID,
          },
        },
      },
    })
  }

  async findOne(id: Trophy['id']) {
    return this.prisma.tbl_trophy.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: Trophy['id'], trophyInput: TrophyInput) {
    return this.prisma.tbl_trophy.update({
      where: {
        id,
      },
      data: {
        ...trophyInput,
      },
    })
  }

  async remove(id: Trophy['id']) {
    return this.prisma.tbl_trophy.delete({
      where: {
        id,
      },
    })
  }
}
