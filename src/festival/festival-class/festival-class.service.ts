import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  FestivalClass,
  FestivalClassInput,
  FestivalClassSearchArgs,
  SGSlabel,
} from 'src/graphql'
import { tbl_subdiscipline, tbl_category, tbl_level } from '@prisma/client'

// import { CreateFestivalClassInput } from './dto/create-festival-class.input'
// import { UpdateFestivalClassInput } from './dto/update-festival-class.input'

@Injectable()
export class FestivalClassService {
  constructor(private prisma: PrismaService) {}

  async create(SGSlabel, festivalClass) {
    return {
      festivalClass: await this.prisma.tbl_classlist.create({
        data: {
          SGSlabel,
          ...festivalClass,
        },
      }),
    }
  }

  async findAll(
    SGSlabel?: SGSlabel,
    subdisciplineID?: tbl_subdiscipline['id'],
    levelID?: tbl_level['id'],
    categoryID?: tbl_category['id'],
  ) {
    return this.prisma.tbl_classlist.findMany({
      where: { SGSlabel, subdisciplineID, levelID, categoryID },
    })
  }

  async findClassTrophies(festivalClassID: FestivalClass['id']) {
    return await this.prisma.tbl_trophy.findMany({
      where: {
        tbl_class_trophy: {
          some: {
            classID: festivalClassID,
          },
        },
      },
    })
  }

  async search(festivalClassSearch: FestivalClassSearchArgs) {
    const { subdisciplineID, levelID, categoryID } = festivalClassSearch
    return this.prisma.tbl_classlist.findMany({
      where: {
        subdisciplineID,
        levelID,
        categoryID,
      },
    })
  }

  async findById(id: FestivalClass['id']) {
    return this.prisma.tbl_classlist.findUnique({
      where: { id },
    })
  }

  async findByNumber(classNumber: FestivalClass['classNumber']) {
    return this.prisma.tbl_classlist.findUnique({
      where: { classNumber },
    })
  }

  async update(
    festivalClassID: FestivalClass['id'],
    festivalClass: FestivalClassInput,
  ) {
    return this.prisma.tbl_classlist.update({
      where: { id: festivalClassID },
      data: { ...festivalClass },
    })
  }

  async remove(id: FestivalClass['id']) {
    return this.prisma.tbl_classlist.delete({
      where: { id },
    })
  }
}
