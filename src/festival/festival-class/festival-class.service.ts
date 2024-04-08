import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { FestivalClassSearchArgs } from './dto/festival-class.input'
import { FestivalClassInput } from './dto/festival-class.input'

import {
  tbl_subdiscipline,
  tbl_category,
  tbl_level,
  tbl_classlist,
  tbl_class_trophy,
  tbl_class_type
} from '@prisma/client'
import { PerformerType, UserError } from '@/common.entity'
import {FestivalClass, FestivalClassPayload} from './entities/festival-class.entity'

@Injectable()
export class FestivalClassService {
  constructor(private prisma: PrismaService) {}

  async create(
    festivalClassInput: FestivalClassInput
  ){
    let festivalClass: tbl_classlist
    let userErrors: UserError[]
    try {
      festivalClass = await this.prisma.tbl_classlist.create({
        data: {
          ...festivalClassInput
        },
      })
    } catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Festival class already exists',
            field: ['name']
          }
        ]
        festivalClass = null
      } else {
        userErrors = [
          {
            message: 'Cannot create festival class',
            field: []
          }
        ]
        festivalClass = null
      }
    }
    return {
      userErrors,
      festivalClass,
    }
  }

  async findAll(
    performerType?: PerformerType,
    subdisciplineID?: tbl_subdiscipline['id'],
    levelID?: tbl_level['id'],
    categoryID?: tbl_category['id'],
    classTypeID?: tbl_class_type['id']
  ) {
      return await this.prisma.tbl_classlist.findMany({
      where: {
        performerType: performerType ?? undefined,
        subdisciplineID: subdisciplineID ?? undefined,
        levelID: levelID ?? undefined,
        categoryID: categoryID ?? undefined,
        classTypeID: classTypeID ?? undefined
      },
    })
  }

  async findClassTrophies(
    festivalClassNumber: tbl_class_trophy['classNumber']
  ) {
    return await this.prisma.tbl_trophy.findMany({
      where: {
        tbl_class_trophy: {
          some: {
            classNumber: festivalClassNumber,
          },
        },
      },
    })
  }

  async search(festivalClassSearch: FestivalClassSearchArgs) {
    const { subdisciplineID, levelID, categoryID } = festivalClassSearch
    return await this.prisma.tbl_classlist.findMany({
      where: {
        subdisciplineID,
        levelID,
        categoryID,
      },
    })
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
    festivalClassInput: FestivalClassInput
  ){
    return {
      userErrors: [],
      festivalClass: await this.prisma.tbl_classlist.update({
        where: { id: festivalClassID },
        data: { ...festivalClassInput },
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
