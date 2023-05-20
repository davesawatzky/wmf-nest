import { Injectable } from '@nestjs/common'
import { tbl_subdiscipline, tbl_category, tbl_level, tbl_discipline } from '@prisma/client'
import { SubdisciplineInput } from './dto/subdiscipline.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { PerformerType } from 'src/common.entity'
// import { CreateSubdisciplineInput } from './dto/create-subdiscipline.input'
// import { UpdateSubdisciplineInput } from './dto/update-subdiscipline.input'

@Injectable()
export class SubdisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(disciplineID: tbl_discipline['id'], subdisciplineInput: SubdisciplineInput) {
    return this.prisma.tbl_subdiscipline.create({
      data: {
        disciplineID: disciplineID,
        ...subdisciplineInput,
      },
    })
  }

  async findAll(
    disciplineID?: tbl_discipline['id'],
    levelID?: tbl_level['id'],
    categoryID?: tbl_category['id'],
    performerType?: PerformerType
  ) {
    return await this.prisma.tbl_subdiscipline.findMany({
      where: {
        performerType,
        disciplineID,
        tbl_classlist: {
          some: {
            levelID,
            categoryID,
          },
        },
      },
    })
  }

  async findOne(id: tbl_subdiscipline['id']) {
    return this.prisma.tbl_subdiscipline.findUnique({
      where: { id },
    })
  }

  async findSubByName(name: tbl_subdiscipline['name']) {
    return this.prisma.tbl_subdiscipline.findMany({
      where: { name },
    })
  }

  // async findClasses(subdisciplineID: tbl_subdiscipline['id']) {
  //   return this.prisma.tbl_classlist.findMany({
  //     where: { subdisciplineID },
  //   })
  // }

  async update(id: tbl_subdiscipline['id'], subdisciplineInput: SubdisciplineInput) {
    return this.prisma.tbl_subdiscipline.update({
      where: { id },
      data: { ...subdisciplineInput },
    })
  }

  async remove(id: tbl_subdiscipline['id']) {
    return this.prisma.tbl_subdiscipline.delete({
      where: { id },
    })
  }
}
