import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { FestivalClassSearchArgs } from './dto/festival-class.input'
import { FestivalClassInput } from './dto/festival-class.input'

import {
  tbl_subdiscipline,
  tbl_category,
  tbl_level,
  tbl_classlist,
  tbl_class_trophy,
} from '@prisma/client'
import { PerformerType } from 'src/common.entity'

@Injectable()
export class FestivalClassService {
  constructor(private prisma: PrismaService) {}

  async create(
    performerType: PerformerType,
    festivalClass: FestivalClassInput
  ) {
    return {
      userErrors: [],
      festivalClass: await this.prisma.tbl_classlist.create({
        data: {
          performerType,
          ...festivalClass,
        },
      }),
    }
  }

  async findAll(
    performerType?: PerformerType,
    subdisciplineID?: tbl_subdiscipline['id'],
    levelID?: tbl_level['id'],
    categoryID?: tbl_category['id']
  ) {
    return await this.prisma.tbl_classlist.findMany({
      where: {
        performerType,
        subdisciplineID,
        levelID,
        categoryID,
      },
    })
  }

  async findClassTrophies(festivalClassID: tbl_class_trophy['classID']) {
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
    return {
      userErrors: [],
      festivalClasses: await this.prisma.tbl_classlist.findMany({
        where: {
          subdisciplineID,
          levelID,
          categoryID,
        },
      }),
    }
  }

  async findById(id: tbl_classlist['id']) {
    return await this.prisma.tbl_classlist.findUnique({
      where: { id },
    })
  }

  async findByNumber(classNumber: tbl_classlist['classNumber']) {
    return await this.prisma.tbl_classlist.findUnique({
      where: { classNumber },
    })
  }

  async update(
    festivalClassID: tbl_classlist['id'],
    festivalClass: Partial<tbl_classlist>
  ) {
    return {
      userErrors: [],
      festivalClass: await this.prisma.tbl_classlist.update({
        where: { id: festivalClassID },
        data: { ...festivalClass },
      }),
    }
  }

  async remove(id: tbl_classlist['id']) {
    return {
      userErrors: [],
      festivalClass: await this.prisma.tbl_classlist.delete({
        where: { id },
      }),
    }
  }
}
