import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  FestivalClass,
  FestivalClassInput,
  FestivalClassSearchArgs,
  SGSlabel,
} from 'src/graphql'
// import { CreateFestivalClassInput } from './dto/create-festival-class.input'
// import { UpdateFestivalClassInput } from './dto/update-festival-class.input'

@Injectable()
export class FestivalClassService {
  constructor(private prisma: PrismaService) {}

  async create(SGSlabel, festivalClassInput) {
    return {
      userErrors: [],
      festivalClass: this.prisma.tbl_classlist.create({
        data: {
          SGSlabel,
          ...festivalClassInput,
        },
      }),
    }
  }

  async findAll(SGSlabel: SGSlabel) {
    return this.prisma.tbl_classlist.findMany({
      where: {
        SGSlabel,
      },
    })
  }

  async searchFestivalClass(festivalClassSearch: FestivalClassSearchArgs) {
    const { subdisciplineID, levelID, categoryID } = festivalClassSearch
    return this.prisma.tbl_classlist.findMany({
      where: {
        subdisciplineID,
        levelID,
        categoryID,
      },
    })
  }

  async findOne(id: number) {
    return `This action returns a #${id} festivalClass`
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

  remove(id: number) {
    return `This action removes a #${id} festivalClass`
  }
}
