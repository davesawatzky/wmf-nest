import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_discipline, tbl_subdiscipline } from '@prisma/client'

import { PerformerType, UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { SubdisciplineInput } from './dto/subdiscipline.input'

@Injectable()
export class SubdisciplineService {
  private readonly logger = new Logger(SubdisciplineService.name)

  constructor(private prisma: PrismaService) {}

  async create(subdisciplineInput: SubdisciplineInput) {
    this.logger.debug(
      `Creating subdiscipline with data: ${JSON.stringify(subdisciplineInput)}`,
    )

    let subdiscipline: tbl_subdiscipline
    let userErrors: UserError[] = []

    try {
      if (!subdisciplineInput) {
        return {
          userErrors: [
            {
              message: 'Subdiscipline input data must be provided',
              field: [],
            },
          ],
          subdiscipline: null,
        }
      }
      subdiscipline = await this.prisma.tbl_subdiscipline.create({
        data: {
          ...subdisciplineInput,
        },
      })

      this.logger.log(
        `Successfully created subdiscipline with ID: ${subdiscipline.id}`,
      )

      return {
        userErrors,
        subdiscipline: {
          ...subdiscipline,
          performerType: subdiscipline.performerType as PerformerType,
        },
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create subdiscipline: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Subdiscipline with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate subdiscipline name attempted: ${subdisciplineInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while creating the subdiscipline',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        subdiscipline: null,
      }
    }
  }

  async findAll(
    disciplineID?: tbl_discipline['id'] | null,
    performerType?: PerformerType | null,
  ) {
    this.logger.debug(
      `Retrieving subdisciplines with filters - disciplineID: ${disciplineID}, performerType: ${performerType}`,
    )

    try {
      if (!performerType || !disciplineID) {
        this.logger.debug(
          'No performerType or disciplineID filter provided, retrieving all subdisciplines',
        )
      }
      const subdisciplines = await this.prisma.tbl_subdiscipline.findMany({
        where: {
          performerType: performerType ?? undefined,
          disciplineID: disciplineID ?? undefined,
        },
      })

      // Cast performerType to GraphQL enum
      const mappedSubdisciplines = subdisciplines.map(subdiscipline => ({
        ...subdiscipline,
        performerType: subdiscipline.performerType as PerformerType,
      }))

      this.logger.log(
        `Successfully retrieved ${mappedSubdisciplines.length} subdisciplines`,
      )
      return mappedSubdisciplines
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve subdisciplines: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve subdisciplines',
      )
    }
  }

  async findOne(id: tbl_subdiscipline['id']) {
    this.logger.debug(`Retrieving subdiscipline with ID: ${id}`)

    if (!id) {
      this.logger.warn('Attempted to find subdiscipline without providing ID')
      throw new BadRequestException('Subdiscipline ID is required')
    }

    try {
      const subdiscipline = await this.prisma.tbl_subdiscipline.findUnique({
        where: { id },
      })

      if (!subdiscipline) {
        this.logger.error(`Subdiscipline not found with ID: ${id}`)
      }
      else {
        this.logger.log(`Successfully retrieved subdiscipline with ID: ${id}`)
      }
      return {
        ...subdiscipline,
        performerType: subdiscipline.performerType as PerformerType,
      }
    }
    catch (error: any) {
      if (
        error instanceof NotFoundException
        || error instanceof BadRequestException
      ) {
        throw error
      }
      this.logger.error(
        `Failed to retrieve subdiscipline with ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve subdiscipline',
      )
    }
  }

  async update(
    id: tbl_subdiscipline['id'],
    subdisciplineInput: SubdisciplineInput,
  ) {
    this.logger.debug(
      `Updating subdiscipline with ID: ${id}, data: ${JSON.stringify(subdisciplineInput)}`,
    )

    let subdiscipline: tbl_subdiscipline
    let userErrors: UserError[] = []

    try {
      if (!id || !subdisciplineInput) {
        return {
          userErrors: [
            {
              message: 'Subdiscipline ID and update data must be provided',
              field: ['id', 'input'],
            },
          ],
          subdiscipline: null,
        }
      }
      subdiscipline = await this.prisma.tbl_subdiscipline.update({
        where: { id },
        data: { ...subdisciplineInput },
      })

      this.logger.log(`Successfully updated subdiscipline with ID: ${id}`)

      return {
        userErrors,
        subdiscipline: {
          ...subdiscipline,
          performerType: subdiscipline.performerType as PerformerType,
        },
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update subdiscipline with ID ${id}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Subdiscipline not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to update non-existent subdiscipline with ID: ${id}`,
        )
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Subdiscipline with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate subdiscipline name attempted during update: ${subdisciplineInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while updating the subdiscipline',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        subdiscipline: null,
      }
    }
  }

  async remove(id: tbl_subdiscipline['id']) {
    this.logger.debug(`Deleting subdiscipline with ID: ${id}`)

    let subdiscipline: tbl_subdiscipline
    let userErrors: UserError[] = []

    try {
      if (!id) {
        return {
          userErrors: [
            {
              message: 'Subdiscipline ID is required to delete a subdiscipline',
              field: ['id'],
            },
          ],
          subdiscipline: null,
        }
      }
      subdiscipline = await this.prisma.tbl_subdiscipline.delete({
        where: { id },
      })

      this.logger.log(`Successfully deleted subdiscipline with ID: ${id}`)

      return {
        userErrors,
        subdiscipline: {
          ...subdiscipline,
          performerType: subdiscipline.performerType as PerformerType,
        },
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete subdiscipline with ID ${id}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Subdiscipline not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete non-existent subdiscipline with ID: ${id}`,
        )
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message:
              'Cannot delete subdiscipline as it is referenced by other records',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete subdiscipline with ID ${id} that has foreign key references`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while deleting the subdiscipline',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        subdiscipline: null,
      }
    }
  }
}
