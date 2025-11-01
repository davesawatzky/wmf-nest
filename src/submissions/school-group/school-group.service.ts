import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_reg_school, tbl_reg_schoolgroup } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { SchoolGroupInput } from './dto/school-group.input'

@Injectable()
export class SchoolGroupService {
  private readonly logger = new Logger(SchoolGroupService.name)
  constructor(private prisma: PrismaService) {}

  async create(
    schoolID: tbl_reg_school['id'],
    schoolGroupInput?: Partial<SchoolGroupInput>,
  ) {
    try {
      this.logger.log(`Creating school group for school ID: ${schoolID}`)

      if (!schoolID) {
        this.logger.warn('School group creation attempted without school ID')
        return {
          userErrors: [
            {
              message: 'School ID is required to create a school group',
              field: ['schoolID'],
            },
          ],
          schoolGroup: null,
        }
      }

      const schoolGroup = await this.prisma.tbl_reg_schoolgroup.create({
        data: { schoolID, ...schoolGroupInput },
      })

      return {
        userErrors: [],
        schoolGroup,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(
          `School group creation failed - Invalid school ID: ${schoolID}`,
        )
        return {
          userErrors: [
            {
              message: 'Invalid school ID provided',
              field: ['schoolID'],
            },
          ],
          schoolGroup: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `School group creation failed - Unique constraint violation: ${error.meta?.target}`,
        )
        return {
          userErrors: [
            {
              message: 'A school group with this information already exists',
              field: error.meta?.target || [],
            },
          ],
          schoolGroup: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during school group creation for school ID ${schoolID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while creating the school group',
              field: [],
            },
          ],
          schoolGroup: null,
        }
      }
    }
  }

  async findAll(schoolID?: tbl_reg_schoolgroup['schoolID']) {
    try {
      this.logger.log(
        `Finding all school groups${schoolID ? ` for school ID: ${schoolID}` : ''}`,
      )

      const schoolGroups = await this.prisma.tbl_reg_schoolgroup.findMany({
        where: schoolID ? { schoolID } : undefined,
      })

      return schoolGroups
    }
    catch (error: any) {
      this.logger.error(
        `Failed to find school groups${schoolID ? ` for school ID: ${schoolID}` : ''}`,
        error,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve school groups',
      )
    }
  }

  async findOne(schoolGroupID: tbl_reg_schoolgroup['id']) {
    try {
      if (!schoolGroupID) {
        this.logger.error('findOne called without school group ID')
        throw new BadRequestException('School group ID is required')
      }

      this.logger.log(`Finding school group with ID: ${schoolGroupID}`)

      const schoolGroup = await this.prisma.tbl_reg_schoolgroup.findUnique({
        where: { id: schoolGroupID },
      })

      if (!schoolGroup) {
        this.logger.warn(`School group not found with ID: ${schoolGroupID}`)
        return null
      }
      return schoolGroup
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }
      this.logger.error(
        `Failed to find school group with ID: ${schoolGroupID}`,
        error,
      )
      throw new InternalServerErrorException('Failed to retrieve school group')
    }
  }

  async update(
    schoolGroupID: tbl_reg_schoolgroup['id'],
    schoolGroupInput: Partial<SchoolGroupInput>,
  ) {
    try {
      if (!schoolGroupID || !schoolGroupInput) {
        return {
          userErrors: [
            {
              message: 'School group ID and update data must be provided',
              field: ['id', 'input'],
            },
          ],
          schoolGroup: null,
        }
      }

      this.logger.log(`Updating school group with ID: ${schoolGroupID}`)

      const schoolGroup = await this.prisma.tbl_reg_schoolgroup.update({
        where: { id: schoolGroupID },
        data: { ...schoolGroupInput },
      })

      return {
        userErrors: [],
        schoolGroup,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `School group update failed - School group with ID ${schoolGroupID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'School group not found',
              field: ['id'],
            },
          ],
          schoolGroup: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `School group update failed - Unique constraint violation: ${error.meta?.target}`,
        )
        return {
          userErrors: [
            {
              message: 'A school group with this information already exists',
              field: error.meta?.target || [],
            },
          ],
          schoolGroup: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `School group update failed - Invalid foreign key: ${error.meta?.field_name}`,
        )
        return {
          userErrors: [
            {
              message: 'Invalid reference provided',
              field: [error.meta?.field_name || 'foreignKey'],
            },
          ],
          schoolGroup: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during school group update for ID ${schoolGroupID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while updating the school group',
              field: [],
            },
          ],
          schoolGroup: null,
        }
      }
    }
  }

  async remove(schoolGroupID: tbl_reg_schoolgroup['id']) {
    try {
      if (!schoolGroupID) {
        return {
          userErrors: [
            {
              message: 'School group ID must be provided for deletion',
              field: ['id'],
            },
          ],
          schoolGroup: null,
        }
      }
      this.logger.log(`Deleting school group with ID: ${schoolGroupID}`)

      const schoolGroup = await this.prisma.tbl_reg_schoolgroup.delete({
        where: { id: schoolGroupID },
      })

      return {
        userErrors: [],
        schoolGroup,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `School group deletion failed - School group with ID ${schoolGroupID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'School group not found',
              field: ['id'],
            },
          ],
          schoolGroup: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `School group deletion failed - Foreign key constraint violation for school group ${schoolGroupID}`,
        )
        return {
          userErrors: [
            {
              message:
                'Cannot delete school group with existing related records',
              field: ['id'],
            },
          ],
          schoolGroup: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during school group deletion for ID ${schoolGroupID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while deleting the school group',
              field: [],
            },
          ],
          schoolGroup: null,
        }
      }
    }
  }
}
