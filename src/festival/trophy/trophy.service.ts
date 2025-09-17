import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_trophy } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { TrophyInput } from './dto/trophy.input'

@Injectable()
export class TrophyService {
  private readonly logger = new Logger(TrophyService.name)

  constructor(private prisma: PrismaService) {}

  async create(trophyInput: TrophyInput) {
    this.logger.debug(
      `Creating trophy with data: ${JSON.stringify(trophyInput)}`,
    )

    let trophy: tbl_trophy
    let userErrors: UserError[] = []

    try {
      trophy = await this.prisma.tbl_trophy.create({
        data: { ...trophyInput },
      })

      this.logger.log(`Successfully created trophy with ID: ${trophy.id}`)

      return {
        userErrors,
        trophy,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create trophy: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Trophy with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate trophy name attempted: ${trophyInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message: 'An unexpected error occurred while creating the trophy',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        trophy: null,
      }
    }
  }

  async findAll() {
    this.logger.debug('Retrieving all trophies')

    try {
      const trophies = await this.prisma.tbl_trophy.findMany()
      this.logger.log(`Successfully retrieved ${trophies.length} trophies`)
      return trophies
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve trophies: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve trophies')
    }
  }

  async findTrophyClasses(trophyID: tbl_trophy['id']) {
    this.logger.debug(`Retrieving classes for trophy with ID: ${trophyID}`)

    if (!trophyID) {
      this.logger.warn(
        'Attempted to find trophy classes without providing trophy ID',
      )
      throw new BadRequestException('Trophy ID is required')
    }

    try {
      const classes = await this.prisma.tbl_classlist.findMany({
        where: {
          tbl_class_trophy: {
            some: {
              trophyID,
            },
          },
        },
      })

      this.logger.log(
        `Successfully retrieved ${classes.length} classes for trophy ID: ${trophyID}`,
      )
      return classes
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve classes for trophy ID ${trophyID}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve trophy classes',
      )
    }
  }

  async findOne(id: tbl_trophy['id']) {
    this.logger.debug(`Retrieving trophy with ID: ${id}`)

    if (!id) {
      this.logger.warn('Attempted to find trophy without providing ID')
      throw new BadRequestException('Trophy ID is required')
    }

    try {
      const trophy = await this.prisma.tbl_trophy.findUnique({
        where: { id },
      })

      if (!trophy) {
        this.logger.warn(`Trophy not found with ID: ${id}`)
        throw new NotFoundException('Trophy not found')
      }

      this.logger.log(
        `Successfully retrieved trophy: ${trophy.name} (ID: ${id})`,
      )
      return trophy
    }
    catch (error: any) {
      if (
        error instanceof NotFoundException
        || error instanceof BadRequestException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to retrieve trophy with ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve trophy')
    }
  }

  async update(id: tbl_trophy['id'], trophyInput: TrophyInput) {
    this.logger.debug(`Updating trophy with ID: ${id}`, { trophyInput })

    let trophy: tbl_trophy
    let userErrors: UserError[]

    try {
      userErrors = []
      trophy = await this.prisma.tbl_trophy.update({
        where: { id },
        data: { ...trophyInput },
      })

      this.logger.log(
        `Successfully updated trophy: ${trophy.name} (ID: ${id})`,
      )
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update trophy with ID ${id}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Trophy to update not found',
            field: ['id'],
          },
        ]
        trophy = null
        this.logger.warn(
          `Attempted to update non-existent trophy with ID: ${id}`,
        )
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'A trophy with this name already exists',
            field: ['name'],
          },
        ]
        trophy = null
        this.logger.warn(
          `Attempted to create duplicate trophy name: ${trophyInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message: 'Cannot update trophy',
            field: [],
          },
        ]
        trophy = null
        this.logger.error(
          `Unexpected error updating trophy ID ${id}: ${error.message}`,
        )
      }
    }

    return {
      userErrors,
      trophy,
    }
  }

  async remove(id: tbl_trophy['id']) {
    this.logger.debug(`Deleting trophy with ID: ${id}`)

    let trophy: tbl_trophy
    let userErrors: UserError[]

    try {
      userErrors = []
      trophy = await this.prisma.tbl_trophy.delete({
        where: { id },
      })

      this.logger.log(
        `Successfully deleted trophy: ${trophy.name} (ID: ${id})`,
      )
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete trophy with ID ${id}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Trophy to delete not found',
            field: ['id'],
          },
        ]
        trophy = null
        this.logger.warn(
          `Attempted to delete non-existent trophy with ID: ${id}`,
        )
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message:
              'Cannot delete trophy as it is referenced by other records',
            field: ['id'],
          },
        ]
        trophy = null
        this.logger.warn(
          `Attempted to delete trophy with foreign key constraints: ID ${id}`,
        )
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete trophy',
            field: [],
          },
        ]
        trophy = null
        this.logger.error(
          `Unexpected error deleting trophy ID ${id}: ${error.message}`,
        )
      }
    }

    return {
      userErrors,
      trophy,
    }
  }
}
