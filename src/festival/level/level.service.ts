import { Injectable } from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { LevelInput } from './dto/level.input'
import { PrismaService } from 'src/prisma/prisma.service'
// import { CreateLevelInput } from './dto/create-level.input'
// import { UpdateLevelInput } from './dto/update-level.input'

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}

  async create(levelInput: LevelInput) {
    return await this.prisma.tbl_level.create({
      data: { ...levelInput },
    })
  }

  async findAll(
    categoryID?: tbl_category['id'],
    subdisciplineID?: tbl_subdiscipline['id']
  ) {
    return await this.prisma.tbl_level.findMany({
      where: {
        tbl_classlist: {
          some: {
            categoryID,
            subdisciplineID,
          },
        },
      },
    })
  }

  async findOne(id: tbl_level['id']) {
    return await this.prisma.tbl_level.findUnique({
      where: { id },
    })
  }

  // async findClasses(levelID: tbl_level['id']) {
  //   return {
  //     userErrors: [],
  //       festivalClasses: await this.prisma.tbl_classlist.findMany({
  //       where: { levelID },
  //     })
  //   }
  // }

  async update(id: tbl_level['id'], levelInput: LevelInput) {
    return {
      userErrors: [],
      level: await this.prisma.tbl_level.update({
        where: { id },
        data: { ...levelInput },
      }),
    }
  }

  async remove(id: tbl_level['id']) {
    return {
      userErrors: [],
      level: await this.prisma.tbl_level.delete({
        where: { id },
      }),
    }
  }
}
