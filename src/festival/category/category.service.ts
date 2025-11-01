import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { CategoryInput } from './dto/category.input'

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name)

  constructor(private prisma: PrismaService) {}

  async create(categoryInput: CategoryInput) {
    try {
      if (!categoryInput) {
        return {
          userErrors: [
            {
              message: 'Category input data must be provided',
              field: [],
            },
          ],
          category: null,
        }
      }
      this.logger.log(`Creating category with name: ${categoryInput.name}`)

      const category = await this.prisma.tbl_category.create({
        data: { ...categoryInput },
      })

      this.logger.log(`Category created successfully with ID: ${category.id}`)
      return {
        userErrors: [],
        category,
      }
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        this.logger.warn(
          `Category creation failed - Name already exists: ${categoryInput.name}`,
        )
        return {
          userErrors: [
            {
              message: 'Category name already exists',
              field: ['name'],
            },
          ],
          category: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during category creation for name: ${categoryInput.name}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while creating the category',
              field: [],
            },
          ],
          category: null,
        }
      }
    }
  }

  async findAll(
    levelID?: tbl_level['id'],
    subdisciplineID?: tbl_subdiscipline['id'],
  ) {
    try {
      if (!levelID && !subdisciplineID) {
        this.logger.log('Must have  at least one filter to fetch categories')
        return null
      }
      this.logger.log(
        `Fetching categories with filters - levelID: ${levelID}, subdisciplineID: ${subdisciplineID}`,
      )

      return await this.prisma.tbl_category.findMany({
        where: {
          tbl_classlist: {
            some: {
              levelID,
              subdisciplineID,
            },
          },
        },
        orderBy: { name: 'asc' },
      })
    }
    catch (error: any) {
      this.logger.error(
        `Error fetching categories with filters - levelID: ${levelID}, subdisciplineID: ${subdisciplineID}`,
        error,
      )
      throw new InternalServerErrorException('Unable to fetch categories')
    }
  }

  async findOne(id: tbl_category['id']) {
    try {
      if (!id) {
        this.logger.error('findOne called without category ID')
        return null
      }

      this.logger.log(`Finding category with ID: ${id}`)

      const category = await this.prisma.tbl_category.findUnique({
        where: { id },
      })

      if (!category) {
        this.logger.warn(`Category not found with ID: ${id}`)
      }

      return category
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }
      this.logger.error(`Error finding category with ID: ${id}`, error)
      throw new InternalServerErrorException('Unable to find category')
    }
  }

  async update(id: tbl_category['id'], categoryInput: CategoryInput) {
    try {
      if (!id || !categoryInput) {
        return {
          userErrors: [
            {
              message: 'Category ID and input data must be provided',
              field: ['id', 'categoryInput'],
            },
          ],
          category: null,
        }
      }
      this.logger.log(`Updating category with ID: ${id}`)

      const category = await this.prisma.tbl_category.update({
        where: { id },
        data: { ...categoryInput },
      })

      this.logger.log(`Category updated successfully with ID: ${id}`)
      return {
        userErrors: [],
        category,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Category update failed - Category with ID ${id} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Category not found',
              field: ['id'],
            },
          ],
          category: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Category update failed - Name already exists for category ${id}: ${categoryInput.name}`,
        )
        return {
          userErrors: [
            {
              message: 'Category name already exists',
              field: ['name'],
            },
          ],
          category: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Category update failed - Foreign key constraint violation for category ${id}`,
        )
        return {
          userErrors: [
            {
              message: 'Category update violates foreign key constraint',
              field: [error.meta?.field_name || 'unknown'],
            },
          ],
          category: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during category update for ID ${id}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while updating the category',
              field: [],
            },
          ],
          category: null,
        }
      }
    }
  }

  async remove(id: tbl_category['id']) {
    try {
      if (!id) {
        return {
          userErrors: [
            {
              message: 'Category ID must be provided',
              field: ['id'],
            },
          ],
          category: null,
        }
      }
      this.logger.log(`Deleting category with ID: ${id}`)

      const category = await this.prisma.tbl_category.delete({
        where: { id },
      })

      this.logger.log(`Category deleted successfully with ID: ${id}`)
      return {
        userErrors: [],
        category,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Category deletion failed - Category with ID ${id} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Category not found',
              field: ['id'],
            },
          ],
          category: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Category deletion failed - Foreign key constraint violation for category ${id}`,
        )
        return {
          userErrors: [
            {
              message: 'Cannot delete category with existing related records',
              field: ['id'],
            },
          ],
          category: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during category deletion for ID ${id}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while deleting the category',
              field: [],
            },
          ],
          category: null,
        }
      }
    }
  }
}
