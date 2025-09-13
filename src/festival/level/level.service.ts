import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_category, tbl_level, tbl_subdiscipline } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { LevelInput } from './dto/level.input'
// import { CreateLevelInput } from './dto/create-level.input'
// import { UpdateLevelInput } from './dto/update-level.input'

@Injectable()
export class LevelService {
  private readonly logger = new Logger(LevelService.name)

  constructor(private prisma: PrismaService) {}

  async create(levelInput: LevelInput) {
    this.logger.debug(`Creating level with data: ${JSON.stringify(levelInput)}`)

    let level: tbl_level
    let userErrors: UserError[] = []

    try {
      level = await this.prisma.tbl_level.create({
        data: { ...levelInput },
      })

      this.logger.log(`Successfully created level with ID: ${level.id}`)

      return {
        userErrors,
        level,
      }
    }
    catch (error: any) {
      this.logger.error(`Failed to create level: ${error.message}`, error.stack)

      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Level with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(`Duplicate level name attempted: ${levelInput.name}`)
      }
      else {
        userErrors = [
          {
            message: 'An unexpected error occurred while creating the level',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        level: null,
      }
    }
  }

  async findAll(
    categoryID?: tbl_category['id'],
    subdisciplineID?: tbl_subdiscipline['id'],
  ) {
    this.logger.debug(`Retrieving levels with filters - categoryID: ${categoryID}, subdisciplineID: ${subdisciplineID}`)

    try {
      const levels = await this.prisma.tbl_level.findMany({
        where: {
          tbl_classlist: {
            some: {
              categoryID,
              subdisciplineID,
            },
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      })

      this.logger.log(`Successfully retrieved ${levels.length} levels`)
      return levels
    }
    catch (error: any) {
      this.logger.error(`Failed to retrieve levels: ${error.message}`, error.stack)
      throw new InternalServerErrorException('Failed to retrieve levels')
    }
  }

  async findOne(id: tbl_level['id']) {
    this.logger.debug(`Retrieving level with ID: ${id}`)

    if (!id) {
      this.logger.warn('Attempted to find level without providing ID')
      throw new BadRequestException('Level ID is required')
    }

    try {
      const level = await this.prisma.tbl_level.findUnique({
        where: { id },
      })

      if (!level) {
        this.logger.warn(`Level not found with ID: ${id}`)
        throw new NotFoundException(`Level with ID ${id} not found`)
      }

      this.logger.log(`Successfully retrieved level with ID: ${id}`)
      return level
    }
    catch (error: any) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error
      }

      this.logger.error(`Failed to retrieve level with ID ${id}: ${error.message}`, error.stack)
      throw new InternalServerErrorException('Failed to retrieve level')
    }
  }

  async update(id: tbl_level['id'], levelInput: LevelInput) {
    this.logger.debug(`Updating level with ID: ${id}, data: ${JSON.stringify(levelInput)}`)

    let level: tbl_level
    let userErrors: UserError[] = []

    try {
      level = await this.prisma.tbl_level.update({
        where: { id },
        data: { ...levelInput },
      })

      this.logger.log(`Successfully updated level with ID: ${id}`)

      return {
        userErrors,
        level,
      }
    }
    catch (error: any) {
      this.logger.error(`Failed to update level with ID ${id}: ${error.message}`, error.stack)

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Level not found',
            field: ['id'],
          },
        ]
        this.logger.warn(`Attempted to update non-existent level with ID: ${id}`)
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Level with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(`Duplicate level name attempted during update: ${levelInput.name}`)
      }
      else {
        userErrors = [
          {
            message: 'An unexpected error occurred while updating the level',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        level: null,
      }
    }
  }

  async remove(id: tbl_level['id']) {
    this.logger.debug(`Deleting level with ID: ${id}`)

    let level: tbl_level
    let userErrors: UserError[] = []

    try {
      level = await this.prisma.tbl_level.delete({
        where: { id },
      })

      this.logger.log(`Successfully deleted level with ID: ${id}`)

      return {
        userErrors,
        level,
      }
    }
    catch (error: any) {
      this.logger.error(`Failed to delete level with ID ${id}: ${error.message}`, error.stack)

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Level not found',
            field: ['id'],
          },
        ]
        this.logger.warn(`Attempted to delete non-existent level with ID: ${id}`)
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot delete level as it is referenced by other records',
            field: ['id'],
          },
        ]
        this.logger.warn(`Attempted to delete level with ID ${id} that has foreign key references`)
      }
      else {
        userErrors = [
          {
            message: 'An unexpected error occurred while deleting the level',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        level: null,
      }
    }
  }
}
