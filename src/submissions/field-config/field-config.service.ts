import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_field_config } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { FieldConfigInput } from './dto/field-config.input'

@Injectable()
export class FieldConfigService {
  private readonly logger = new Logger(FieldConfigService.name)

  constructor(private prisma: PrismaService) {}

  async findAll() {
    this.logger.debug('Retrieving all field configurations')

    try {
      const fieldConfigs = await this.prisma.tbl_field_config.findMany()

      this.logger.log(
        `Successfully retrieved ${fieldConfigs.length} field configurations`,
      )
      return fieldConfigs
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve field configurations: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve field configurations',
      )
    }
  }

  async findOne(tableName: string, fieldName: string) {
    this.logger.debug(
      `Retrieving field configuration for table: ${tableName}, field: ${fieldName}`,
    )

    if (!tableName || !fieldName) {
      this.logger.warn(
        'Attempted to find field configuration without required parameters',
      )
      throw new BadRequestException(
        'Both tableName and fieldName are required',
      )
    }

    try {
      const fieldConfig = await this.prisma.tbl_field_config.findUnique({
        where: { single_field: { tableName, fieldName } },
      })

      if (!fieldConfig) {
        this.logger.warn(
          `Field configuration not found for table: ${tableName}, field: ${fieldName}`,
        )
        throw new NotFoundException(
          `Field configuration not found for table '${tableName}' and field '${fieldName}'`,
        )
      }

      this.logger.log(
        `Successfully retrieved field configuration for ${tableName}.${fieldName}`,
      )
      return fieldConfig
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to retrieve field configuration for ${tableName}.${fieldName}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve field configuration',
      )
    }
  }

  async create(fieldConfigInput: FieldConfigInput) {
    this.logger.debug(
      `Creating field configuration for table: ${fieldConfigInput.tableName}, field: ${fieldConfigInput.fieldName}`,
    )

    let fieldConfig: tbl_field_config
    let userErrors: UserError[]

    try {
      userErrors = []
      fieldConfig = await this.prisma.tbl_field_config.create({
        data: {
          ...fieldConfigInput,
        },
      })

      this.logger.log(
        `Successfully created field configuration with ID ${fieldConfig.id} for ${fieldConfigInput.tableName}.${fieldConfigInput.fieldName}`,
      )
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create field configuration for ${fieldConfigInput.tableName}.${fieldConfigInput.fieldName}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2002') {
        userErrors = [
          {
            message:
              'Field configuration already exists for this table and field combination',
            field: ['tableName', 'fieldName'],
          },
        ]
        fieldConfig = null
        this.logger.warn(
          `Attempted to create duplicate field configuration for ${fieldConfigInput.tableName}.${fieldConfigInput.fieldName}`,
        )
      }
      else {
        userErrors = [
          {
            message: 'Cannot create field configuration',
            field: [],
          },
        ]
        fieldConfig = null
        this.logger.error(
          `Unexpected error creating field configuration for ${fieldConfigInput.tableName}.${fieldConfigInput.fieldName}: ${error.message}`,
        )
      }
    }

    return {
      userErrors,
      fieldConfig,
    }
  }

  async update(fieldConfigID: number, fieldConfigInput: FieldConfigInput) {
    this.logger.debug(`Updating field configuration with ID: ${fieldConfigID}`)

    let fieldConfig: tbl_field_config
    let userErrors: UserError[]

    try {
      userErrors = []
      fieldConfig = await this.prisma.tbl_field_config.update({
        where: { id: fieldConfigID },
        data: {
          ...fieldConfigInput,
        },
      })

      this.logger.log(
        `Successfully updated field configuration with ID ${fieldConfigID}`,
      )
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update field configuration with ID ${fieldConfigID}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Field configuration to update not found',
            field: ['id'],
          },
        ]
        fieldConfig = null
        this.logger.warn(
          `Attempted to update non-existent field configuration with ID: ${fieldConfigID}`,
        )
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message:
              'Field configuration already exists for this table and field combination',
            field: ['tableName', 'fieldName'],
          },
        ]
        fieldConfig = null
        this.logger.warn(
          `Attempted to update field configuration to duplicate combination for ID ${fieldConfigID}`,
        )
      }
      else {
        userErrors = [
          {
            message: 'Cannot update field configuration',
            field: [],
          },
        ]
        fieldConfig = null
        this.logger.error(
          `Unexpected error updating field configuration ID ${fieldConfigID}: ${error.message}`,
        )
      }
    }

    return {
      userErrors,
      fieldConfig,
    }
  }

  async remove(fieldConfigID: number) {
    this.logger.debug(`Deleting field configuration with ID: ${fieldConfigID}`)

    let fieldConfig: tbl_field_config
    let userErrors: UserError[]

    try {
      userErrors = []
      fieldConfig = await this.prisma.tbl_field_config.delete({
        where: { id: fieldConfigID },
      })

      this.logger.log(
        `Successfully deleted field configuration with ID ${fieldConfigID}`,
      )
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete field configuration with ID ${fieldConfigID}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Field configuration to delete not found',
            field: ['id'],
          },
        ]
        fieldConfig = null
        this.logger.warn(
          `Attempted to delete non-existent field configuration with ID: ${fieldConfigID}`,
        )
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message:
              'Cannot delete field configuration as it is referenced by other records',
            field: ['id'],
          },
        ]
        fieldConfig = null
        this.logger.warn(
          `Attempted to delete field configuration with foreign key constraints: ID ${fieldConfigID}`,
        )
      }
      else {
        userErrors = [
          {
            message: 'Cannot delete field configuration',
            field: [],
          },
        ]
        fieldConfig = null
        this.logger.error(
          `Unexpected error deleting field configuration ID ${fieldConfigID}: ${error.message}`,
        )
      }
    }

    return {
      userErrors,
      fieldConfig,
    }
  }
}
