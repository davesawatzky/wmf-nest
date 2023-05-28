import { Injectable } from '@nestjs/common'
import { tbl_trophy } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { TrophyInput } from './dto/trophy.input'

@Injectable()
export class TrophyService {
  constructor(private prisma: PrismaService) {}

  async create(trophyInput: TrophyInput) {
    return {
      userErrors: [],
      trophy: await this.prisma.tbl_trophy.create({
        data: { ...trophyInput },
      })
    }
  }

  async findAll() {
    return {
      userErrors: [],
      trophies: await this.prisma.tbl_trophy.findMany()
    }
  }

  async findTrophyClasses(trophyID: tbl_trophy['id']) {
    return {
      userErrors: [],
      trophyClasses: this.prisma.tbl_classlist.findMany({
        where: {
          tbl_class_trophy: {
            some: {
              trophyID: trophyID,
            },
          },
        },
      })
    }
  }

  async findOne(id: tbl_trophy['id']) {
    return {
      userErrors: [],
      trophy: await this.prisma.tbl_trophy.findUnique({
        where: { id },
      })
    }
  }

  async update(id: tbl_trophy['id'], trophyInput: TrophyInput) {
    return {
      userErrors: [],
      trophy: await this.prisma.tbl_trophy.update({
        where: { id },
        data: { ...trophyInput },
      })
    }
  }

  async remove(id: tbl_trophy['id']) {
    return {
      userErrors: [],
      trophy: await this.prisma.tbl_trophy.delete({
        where: { id },
      })
    }
  }
}
