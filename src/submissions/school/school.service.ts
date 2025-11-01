import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_reg_school, tbl_registration } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { SchoolInput } from './dto/school.input'

@Injectable()
export class SchoolService {
  private readonly logger = new Logger(SchoolService.name)

  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    schoolInput?: Partial<SchoolInput>,
  ) {
    try {
      if (!registrationID) {
        return {
          userErrors: [
            {
              message: 'Registration ID is required to create a school',
              field: ['registrationId'],
            },
          ],
          school: null,
        }
      }

      this.logger.log(`Creating school for registration ID: ${registrationID}`)

      const school = await this.prisma.tbl_reg_school.create({
        data: {
          regID: registrationID,
          ...schoolInput,
        },
      })

      this.logger.log(`School created successfully with ID: ${school.id}`)
      return {
        userErrors: [],
        school,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(
          `School creation failed - Invalid registration ID: ${registrationID}`,
        )
        return {
          userErrors: [
            {
              message: 'Cannot create school. Invalid registration ID',
              field: ['registrationId'],
            },
          ],
          school: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during school creation for registration ${registrationID}`,
          error,
        )
        return {
          userErrors: [
            {
              message: 'An unexpected error occurred while creating the school',
              field: [],
            },
          ],
          school: null,
        }
      }
    }
  }

  async findAll() {
    try {
      this.logger.log('Fetching all schools')
      return await this.prisma.tbl_reg_school.findMany()
    }
    catch (error: any) {
      this.logger.error('Error fetching all schools', error)
      throw new InternalServerErrorException('Unable to fetch schools')
    }
  }

  async findOne(
    registrationID?: tbl_registration['id'],
    schoolID?: tbl_reg_school['id'],
  ) {
    try {
      if (!registrationID && !schoolID) {
        this.logger.warn('findOne called without registrationID or schoolID')
        throw new BadRequestException(
          'Either registrationID or schoolID must be provided',
        )
      }

      this.logger.log(
        `Finding school with registrationID: ${registrationID}, schoolID: ${schoolID}`,
      )

      const school = await this.prisma.tbl_reg_school.findUnique({
        where: {
          regID: registrationID ?? undefined,
          id: schoolID ?? undefined,
        },
      })

      if (!school) {
        this.logger.warn(
          `School not found with registrationID: ${registrationID}, schoolID: ${schoolID}`,
        )
      }
      return school
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }
      this.logger.error(
        `Error finding school with registrationID: ${registrationID}, schoolID: ${schoolID}`,
        error,
      )
      throw new InternalServerErrorException('Unable to find school')
    }
  }

  async update(
    schoolID: tbl_reg_school['id'],
    schoolInput: Partial<SchoolInput>,
  ) {
    try {
      if (!schoolID || !schoolInput) {
        return {
          userErrors: [
            {
              message: 'School ID and input data are required for update',
              field: ['id', 'schoolInput'],
            },
          ],
          school: null,
        }
      }

      this.logger.log(`Updating school with ID: ${schoolID}`)

      const school = await this.prisma.tbl_reg_school.update({
        where: { id: schoolID },
        data: { ...schoolInput },
      })

      this.logger.log(`School updated successfully with ID: ${schoolID}`)
      return {
        userErrors: [],
        school,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `School update failed - School with ID ${schoolID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'School not found',
              field: ['id'],
            },
          ],
          school: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `School update failed - Unique constraint violation for school ${schoolID}`,
        )
        return {
          userErrors: [
            {
              message: 'School update violates unique constraint',
              field: [error.meta?.target?.[0] || 'unknown'],
            },
          ],
          school: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `School update failed - Foreign key constraint violation for school ${schoolID}`,
        )
        return {
          userErrors: [
            {
              message: 'School update violates foreign key constraint',
              field: [error.meta?.field_name || 'unknown'],
            },
          ],
          school: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during school update for ID ${schoolID}`,
          error,
        )
        return {
          userErrors: [
            {
              message: 'An unexpected error occurred while updating the school',
              field: [],
            },
          ],
          school: null,
        }
      }
    }
  }

  async remove(schoolID: tbl_reg_school['id']) {
    try {
      if (!schoolID) {
        return {
          userErrors: [
            {
              message: 'School ID is required to delete a school',
              field: ['id'],
            },
          ],
          school: null,
        }
      }

      this.logger.log(`Deleting school with ID: ${schoolID}`)

      const school = await this.prisma.tbl_reg_school.delete({
        where: { id: schoolID },
      })

      this.logger.log(`School deleted successfully with ID: ${schoolID}`)
      return {
        userErrors: [],
        school,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `School deletion failed - School with ID ${schoolID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'School not found',
              field: ['id'],
            },
          ],
          school: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `School deletion failed - Foreign key constraint violation for school ${schoolID}`,
        )
        return {
          userErrors: [
            {
              message: 'Cannot delete school with existing related records',
              field: ['id'],
            },
          ],
          school: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during school deletion for ID ${schoolID}`,
          error,
        )
        return {
          userErrors: [
            {
              message: 'An unexpected error occurred while deleting the school',
              field: [],
            },
          ],
          school: null,
        }
      }
    }
  }
}
