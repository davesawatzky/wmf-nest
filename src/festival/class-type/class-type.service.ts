import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_class_type } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { ClassTypeInput } from './dto/class-type.input'

@Injectable()
export class ClassTypeService {
  private readonly logger = new Logger(ClassTypeService.name)

  constructor(private prisma: PrismaService) {}

  async create(classTypeInput: ClassTypeInput) {
    this.logger.debug(
      `Creating class type with data: ${JSON.stringify(classTypeInput)}`,
    )

    let classType: tbl_class_type
    let userErrors: UserError[] = []

    try {
      if (!classTypeInput) {
        return {
          userErrors: [
            {
              message: 'Class type input data must be provided',
              field: ['classTypeInput'],
            },
          ],
          classType: null,
        }
      }
      classType = await this.prisma.tbl_class_type.create({
        data: { ...classTypeInput },
      })

      this.logger.log(
        `Successfully created class type with ID: ${classType.id}`,
      )

      return {
        userErrors,
        classType,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create class type: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Class type with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate class type name attempted: ${classTypeInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while creating the class type',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        classType: null,
      }
    }
  }

  async findAll() {
    this.logger.debug('Retrieving all class types')

    try {
      const classTypes = await this.prisma.tbl_class_type.findMany()
      this.logger.log(
        `Successfully retrieved ${classTypes.length} class types`,
      )
      return classTypes
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve class types: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve class types')
    }
  }

  async findOne(id: tbl_class_type['id']) {
    this.logger.debug(`Retrieving class type with ID: ${id}`)

    if (!id) {
      this.logger.error('Attempted to find class type without providing ID')
      throw new BadRequestException('Class type ID is required')
    }

    try {
      const classType = await this.prisma.tbl_class_type.findUnique({
        where: { id },
      })

      if (!classType) {
        this.logger.error(`Class type not found with ID: ${id}`)
      }
      else {
        this.logger.log(`Successfully retrieved class type with ID: ${id}`)
      }
      return classType
    }
    catch (error: any) {
      if (
        error instanceof NotFoundException
        || error instanceof BadRequestException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to retrieve class type with ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve class type')
    }
  }

  async update(id: tbl_class_type['id'], classTypeInput: ClassTypeInput) {
    this.logger.debug(
      `Updating class type with ID: ${id}, data: ${JSON.stringify(classTypeInput)}`,
    )

    let classType: tbl_class_type
    let userErrors: UserError[] = []

    try {
      if (!id || !classTypeInput) {
        return {
          userErrors: [
            {
              message: 'Class type ID and update data must be provided',
              field: ['id', 'classTypeInput'],
            },
          ],
          classType: null,
        }
      }
      classType = await this.prisma.tbl_class_type.update({
        where: { id },
        data: { ...classTypeInput },
      })

      this.logger.log(`Successfully updated class type with ID: ${id}`)

      return {
        userErrors,
        classType,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update class type with ID ${id}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Class type not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to update non-existent class type with ID: ${id}`,
        )
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Class type with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate class type name attempted during update: ${classTypeInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while updating the class type',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        classType: null,
      }
    }
  }

  async remove(id: tbl_class_type['id']) {
    this.logger.debug(`Deleting class type with ID: ${id}`)

    let classType: tbl_class_type
    let userErrors: UserError[] = []

    try {
      if (!id) {
        return {
          userErrors: [
            {
              message: 'Class type ID must be provided',
              field: ['id'],
            },
          ],
          classType: null,
        }
      }
      classType = await this.prisma.tbl_class_type.delete({
        where: { id },
      })

      this.logger.log(`Successfully deleted class type with ID: ${id}`)

      return {
        userErrors,
        classType,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete class type with ID ${id}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Class type not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete non-existent class type with ID: ${id}`,
        )
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message:
              'Cannot delete class type as it is referenced by other records',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete class type with ID ${id} that has foreign key references`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while deleting the class type',
            field: [],
          },
        ]
      }

      return {
        userErrors,
        classType: null,
      }
    }
  }
}
