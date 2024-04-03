import { Injectable } from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { Category, CategoryPayload } from './entities/category.entity'
import { CategoryInput } from './dto/category.input'
import { PrismaService } from '../../prisma/prisma.service'
import {UserError} from 'src/common.entity'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(categoryInput: CategoryInput):Promise<CategoryPayload> {
    let category: Category
    let userErrors: UserError[]
    try {
      userErrors = [],
        category = await this.prisma.tbl_category.create({
          data: {...categoryInput},
        })
    } catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Category name already exists',
            field: ['name']
          }
        ]
        category = null
      } else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot create category',
            field: []
          }
        ]
        category = null
      }
    }
    return {
      userErrors,
      category
    }
  }

  async findAll(
    levelID?: tbl_level['id'],
    subdisciplineID?: tbl_subdiscipline['id']
  ):Promise<Category[]> {
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

  async findOne(id: tbl_category['id']):Promise<Category> {
    return await this.prisma.tbl_category.findUnique({
      where: { id },
    })
  }

  async update(id: tbl_category['id'], categoryInput: CategoryInput):Promise<CategoryPayload> {
    let category: Category
    let userErrors: UserError[]
    try {
      userErrors = []
      category = await this.prisma.tbl_category.update({
        where: {id},
        data: {...categoryInput}
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Category to update not found',
            field: ['id']
          }
        ]
        category = null
      } else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot update category',
            field: []
          }
        ]
        category =null
      }
    }
    return {
      userErrors,
      category
    }
  }

  async remove(id: tbl_category['id']):Promise<CategoryPayload> {
    let category: Category
    let userErrors: UserError[]
    try {
      userErrors = []
      category = await this.prisma.tbl_category.delete({
        where: {id},
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Category to delete not found',
            field: ['id']
          }
        ]
        category = null
      } else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot delete category',
            field: []
          }
        ]
        category =null
      }
    }
    return {
      userErrors,
      category
    }
  }
}

