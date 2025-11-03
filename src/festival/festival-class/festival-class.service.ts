import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  tbl_category,
  tbl_class_trophy,
  tbl_class_type,
  tbl_classlist,
  tbl_level,
  tbl_subdiscipline,
} from '@prisma/client'
import { PerformerType, UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'

import {
  FestivalClassInput,
  FestivalClassSearchArgs,
} from './dto/festival-class.input'

@Injectable()
export class FestivalClassService {
  private readonly logger = new Logger(FestivalClassService.name)

  constructor(private prisma: PrismaService) {}

  async create(festivalClassInput: FestivalClassInput) {
    this.logger.debug(
      `Creating festival class with data: ${JSON.stringify(festivalClassInput)}`,
    )

    let festivalClass: tbl_classlist
    let userErrors: UserError[] = []

    try {
      // Validate foreign key references
      const [category, level, subdiscipline] = await Promise.all([
        this.prisma.tbl_category.findUnique({
          where: { id: festivalClassInput.categoryID },
        }),
        this.prisma.tbl_level.findUnique({
          where: { id: festivalClassInput.levelID },
        }),
        this.prisma.tbl_subdiscipline.findUnique({
          where: { id: festivalClassInput.subdisciplineID },
        }),
      ])

      if (!category) {
        userErrors.push({
          message: 'Category not found',
          field: ['categoryID'],
        })
      }

      if (!level) {
        userErrors.push({
          message: 'Level not found',
          field: ['levelID'],
        })
      }

      if (!subdiscipline) {
        userErrors.push({
          message: 'Subdiscipline not found',
          field: ['subdisciplineID'],
        })
      }

      if (userErrors.length > 0) {
        this.logger.warn(
          `Validation failed for festival class creation: ${JSON.stringify(userErrors)}`,
        )
        return {
          userErrors,
          festivalClass: null,
        }
      }

      festivalClass = await this.prisma.tbl_classlist.create({
        data: {
          ...festivalClassInput,
        },
      })

      this.logger.log(
        `Successfully created festival class with ID: ${festivalClass.id}`,
      )

      return {
        userErrors,
        festivalClass,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create festival class: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Festival class with this class number already exists',
            field: ['classNumber'],
          },
        ]
        this.logger.warn(
          `Duplicate festival class attempted with class number: ${festivalClassInput.classNumber}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while creating the festival class',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        festivalClass: null,
      }
    }
  }

  async findAll(
    performerType?: PerformerType,
    subdisciplineID?: tbl_subdiscipline['id'],
    levelID?: tbl_level['id'],
    categoryID?: tbl_category['id'],
    classTypeID?: tbl_class_type['id'],
  ) {
    this.logger.debug(
      `Retrieving festival classes with filters - performerType: ${performerType}, subdisciplineID: ${subdisciplineID}, levelID: ${levelID}, categoryID: ${categoryID}, classTypeID: ${classTypeID}`,
    )

    try {
      const festivalClasses = await this.prisma.tbl_classlist.findMany({
        where: {
          performerType: performerType ?? undefined,
          subdisciplineID: subdisciplineID ?? undefined,
          levelID: levelID ?? undefined,
          categoryID: categoryID ?? undefined,
          classTypeID: classTypeID ?? undefined,
        },
      })

      this.logger.log(
        `Successfully retrieved ${festivalClasses.length} festival classes`,
      )
      return festivalClasses
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve festival classes: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve festival classes',
      )
    }
  }

  async findClassTrophies(
    festivalClassNumber: tbl_class_trophy['classNumber'],
  ) {
    this.logger.debug(
      `Retrieving trophies for festival class number: ${festivalClassNumber}`,
    )

    if (!festivalClassNumber) {
      this.logger.warn(
        'Attempted to find class trophies without providing class number',
      )
      throw new BadRequestException('Festival class number is required')
    }

    try {
      const trophies = await this.prisma.tbl_trophy.findMany({
        where: {
          tbl_class_trophy: {
            some: {
              classNumber: festivalClassNumber,
            },
          },
        },
      })

      if (trophies.length === 0) {
        this.logger.warn(
          `No trophies found for festival class number: ${festivalClassNumber}`,
        )
        return null
      }

      this.logger.log(
        `Successfully retrieved ${trophies.length} trophies for class number: ${festivalClassNumber}`,
      )
      return trophies
    }
    catch (error: any) {
      this.logger.warn(
        `Failed to retrieve trophies for class number ${festivalClassNumber}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve class trophies',
      )
    }
  }

  async search(festivalClassSearch: FestivalClassSearchArgs) {
    this.logger.debug(
      `Searching festival classes with criteria: ${JSON.stringify(festivalClassSearch)}`,
    )
    const { subdisciplineID, levelID, categoryID } = festivalClassSearch

    try {
      const festivalClasses = await this.prisma.tbl_classlist.findMany({
        where: {
          subdisciplineID,
          levelID,
          categoryID,
        },
      })

      this.logger.log(
        `Successfully found ${festivalClasses.length} festival classes matching search criteria`,
      )
      return festivalClasses
    }
    catch (error: any) {
      this.logger.error(
        `Failed to search festival classes: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to search festival classes',
      )
    }
  }

  async findById(id: tbl_classlist['id']) {
    this.logger.debug(`Retrieving festival class with ID: ${id}`)

    if (!id) {
      this.logger.error('Attempted to find festival class without providing ID')
      throw new BadRequestException('Festival class ID is required')
    }

    try {
      const festivalClass = await this.prisma.tbl_classlist.findUnique({
        where: { id },
      })

      if (!festivalClass) {
        this.logger.error(`Festival class not found with ID: ${id}`)
        throw new NotFoundException('Festival class not found')
      }

      this.logger.log(`Successfully retrieved festival class with ID: ${id}`)
      return festivalClass
    }
    catch (error: any) {
      if (
        error instanceof NotFoundException
        || error instanceof BadRequestException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to retrieve festival class with ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve festival class',
      )
    }
  }

  async findByNumber(classNumber: tbl_classlist['classNumber']) {
    this.logger.debug(
      `Retrieving festival class with class number: ${classNumber}`,
    )

    if (!classNumber) {
      this.logger.error(
        'Attempted to find festival class without providing class number',
      )
      throw new BadRequestException('Festival class number is required')
    }

    try {
      const festivalClass = await this.prisma.tbl_classlist.findUnique({
        where: { classNumber },
      })

      if (!festivalClass) {
        this.logger.error(
          `Festival class not found with class number: ${classNumber}`,
        )
        throw new NotFoundException('Festival class not found')
      }

      this.logger.log(
        `Successfully retrieved festival class with class number: ${classNumber}`,
      )
      return festivalClass
    }
    catch (error: any) {
      if (
        error instanceof NotFoundException
        || error instanceof BadRequestException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to retrieve festival class with class number ${classNumber}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve festival class',
      )
    }
  }

  async update(
    festivalClassID: tbl_classlist['id'],
    festivalClassInput: FestivalClassInput,
  ) {
    this.logger.debug(
      `Updating festival class with ID: ${festivalClassID}, data: ${JSON.stringify(festivalClassInput)}`,
    )

    let festivalClass: tbl_classlist
    let userErrors: UserError[] = []

    try {
      if (!festivalClassID || !festivalClassInput) {
        return {
          userErrors: [
            {
              message: 'Festival class ID and update data must be provided',
              field: ['id', 'input'],
            },
          ],
          festivalClass: null,
        }
      }
      // Validate foreign key references
      const [category, level, subdiscipline] = await Promise.all([
        this.prisma.tbl_category.findUnique({
          where: { id: festivalClassInput.categoryID },
        }),
        this.prisma.tbl_level.findUnique({
          where: { id: festivalClassInput.levelID },
        }),
        this.prisma.tbl_subdiscipline.findUnique({
          where: { id: festivalClassInput.subdisciplineID },
        }),
      ])

      if (!category) {
        userErrors.push({
          message: 'Category not found',
          field: ['categoryID'],
        })
      }

      if (!level) {
        userErrors.push({
          message: 'Level not found',
          field: ['levelID'],
        })
      }

      if (!subdiscipline) {
        userErrors.push({
          message: 'Subdiscipline not found',
          field: ['subdisciplineID'],
        })
      }

      if (userErrors.length > 0) {
        this.logger.warn(
          `Validation failed for festival class update: ${JSON.stringify(userErrors)}`,
        )
        return {
          userErrors,
          festivalClass: null,
        }
      }

      festivalClass = await this.prisma.tbl_classlist.update({
        where: { id: festivalClassID },
        data: { ...festivalClassInput },
      })

      this.logger.log(
        `Successfully updated festival class with ID: ${festivalClassID}`,
      )

      return {
        userErrors,
        festivalClass,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update festival class with ID ${festivalClassID}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Festival class with this class number already exists',
            field: ['classNumber'],
          },
        ]
        this.logger.warn(
          `Duplicate festival class number attempted during update: ${festivalClassInput.classNumber}`,
        )
      }
      else if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Festival class not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to update non-existent festival class with ID: ${festivalClassID}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while updating the festival class',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        festivalClass: null,
      }
    }
  }

  async remove(id: tbl_classlist['id']) {
    this.logger.debug(`Deleting festival class with ID: ${id}`)

    let festivalClass: tbl_classlist
    let userErrors: UserError[] = []

    try {
      if (!id) {
        return {
          userErrors: [
            {
              message: 'Festival class ID must be provided',
              field: ['id'],
            },
          ],
          festivalClass: null,
        }
      }
      festivalClass = await this.prisma.tbl_classlist.delete({
        where: { id },
      })

      this.logger.log(`Successfully deleted festival class with ID: ${id}`)

      return {
        userErrors,
        festivalClass,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete festival class with ID ${id}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Festival class not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete non-existent festival class with ID: ${id}`,
        )
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message:
              'Cannot delete festival class as it is referenced by other records',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete festival class with ID ${id} that has foreign key references`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while deleting the festival class',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        festivalClass: null,
      }
    }
  }
}
