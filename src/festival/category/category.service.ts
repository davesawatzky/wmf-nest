import { Injectable } from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { Category } from './entities/category.entity'
import { CategoryInput } from './dto/category.input'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(categoryInput: CategoryInput) {
    return {
      userErrors: [],
      category: await this.prisma.tbl_category.create({
        data: { ...categoryInput },
      }),
    }
  }

  async findAll(
    levelID?: tbl_level['id'],
    subdisciplineID?: tbl_subdiscipline['id']
  ) {
    return await this.prisma.tbl_category.findMany({
      where: {
        tbl_classlist: {
          some: {
            levelID,
            subdisciplineID,
          },
        },
      },
    })
  }

  async findOne(id: tbl_category['id']) {
    return await this.prisma.tbl_category.findUnique({
      where: { id },
    })
  }

  // async findClasses(categoryID: tbl_category['id']) {
  //   return {
  //     userErrors: [],
  //     classes: this.prisma.tbl_classlist.findMany({
  //       where: { categoryID },
  //     })
  //   }
  // }

  async update(id: tbl_category['id'], categoryInput: CategoryInput) {
    return {
      userErrors: [],
      category: await this.prisma.tbl_category.update({
        where: { id },
        data: { ...categoryInput },
      }),
    }
  }

  async remove(id: tbl_category['id']) {
    return {
      userErrors: [],
      category: await this.prisma.tbl_category.delete({
        where: { id },
      }),
    }
  }
}
