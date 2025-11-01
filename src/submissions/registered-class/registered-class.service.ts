import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_reg_class, tbl_registration } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { RegisteredClassInput } from './dto/registered-class.input'

@Injectable()
export class RegisteredClassService {
  private readonly logger = new Logger(RegisteredClassService.name)

  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: Registration['id'],
    registeredClass: Partial<RegisteredClassInput>,
  ) {
    try {
      if (!registrationID || !registeredClass) {
        return {
          userErrors: [
            {
              message:
                'Registration ID and registered class data are required to create a registered class',
              field: ['registrationId', 'registeredClass'],
            },
          ],
          registeredClass: null,
        }
      }
      this.logger.log(
        `Creating registered class for registration ID: ${registrationID}`,
      )

      const registeredClassResult = await this.prisma.tbl_reg_class.create({
        data: { regID: registrationID, ...registeredClass },
      })

      this.logger.log(
        `Registered class created successfully with ID: ${registeredClassResult.id}`,
      )
      return {
        userErrors: [],
        registeredClass: registeredClassResult,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(
          `Registered class creation failed - Invalid registration ID: ${registrationID}`,
        )
        return {
          userErrors: [
            {
              message:
                'Cannot create registered class. Invalid registration ID',
              field: ['registrationId'],
            },
          ],
          registeredClass: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Registered class creation failed - Unique constraint violation for registration ${registrationID}`,
        )
        return {
          userErrors: [
            {
              message: 'Registered class with these details already exists',
              field: [error.meta?.target?.[0] || 'unknown'],
            },
          ],
          registeredClass: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during registered class creation for registration ${registrationID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while creating the registered class',
              field: [],
            },
          ],
          registeredClass: null,
        }
      }
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    try {
      this.logger.log(
        `Fetching registered classes with filter - registrationID: ${registrationID}`,
      )

      // Can only run if role is admin
      if (!registrationID) {
        const confirmedRegistrations
          = await this.prisma.tbl_registration.findMany({
            where: {
              confirmation: {
                not: null,
              },
            },
          })
        const registrationIDs = confirmedRegistrations.map(
          registration => registration.id,
        )
        return await this.prisma.tbl_reg_class.findMany({
          where: {
            regID: { in: registrationIDs },
          },
          distinct: [
            'classNumber',
            'discipline',
            'subdiscipline',
            'level',
            'category',
          ],
        })
      }
      else {
        return await this.prisma.tbl_reg_class.findMany({
          where: { regID: registrationID },
        })
      }
    }
    catch (error: any) {
      this.logger.error(
        `Error fetching registered classes with filter - registrationID: ${registrationID}`,
        error,
      )
      throw new InternalServerErrorException(
        'Unable to fetch registered classes',
      )
    }
  }

  async findOne(registeredClassID: tbl_reg_class['id']) {
    try {
      if (!registeredClassID) {
        this.logger.error('findOne called without registered class ID')
        throw new BadRequestException('Registered class ID must be provided')
      }

      this.logger.log(`Finding registered class with ID: ${registeredClassID}`)

      const registeredClass = await this.prisma.tbl_reg_class.findUnique({
        where: { id: registeredClassID },
      })
      if (!registeredClass) {
        this.logger.warn(
          `Registered class not found with ID: ${registeredClassID}`,
        )
      }
      return registeredClass
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }
      this.logger.error(
        `Error finding registered class with ID: ${registeredClassID}`,
        error,
      )
      throw new InternalServerErrorException('Unable to find registered class')
    }
  }

  async update(
    registeredClassID: tbl_reg_class['id'],
    registeredClassInput: RegisteredClassInput,
  ) {
    try {
      if (!registeredClassID || !registeredClassInput) {
        return {
          userErrors: [
            {
              message:
                'Registered class ID and update data are required to update a registered class',
              field: ['id', 'registeredClass'],
            },
          ],
          registeredClass: null,
        }
      }
      this.logger.log(
        `Updating registered class with ID: ${registeredClassID}`,
      )

      const registeredClass = await this.prisma.tbl_reg_class.update({
        where: { id: registeredClassID },
        data: { ...registeredClassInput },
      })

      this.logger.log(
        `Registered class updated successfully with ID: ${registeredClassID}`,
      )
      return {
        userErrors: [],
        registeredClass,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Registered class update failed - Registered class with ID ${registeredClassID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Registered class not found',
              field: ['id'],
            },
          ],
          registeredClass: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Registered class update failed - Unique constraint violation for registered class ${registeredClassID}`,
        )
        return {
          userErrors: [
            {
              message: 'Registered class update violates unique constraint',
              field: [error.meta?.target?.[0] || 'unknown'],
            },
          ],
          registeredClass: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Registered class update failed - Foreign key constraint violation for registered class ${registeredClassID}`,
        )
        return {
          userErrors: [
            {
              message:
                'Registered class update violates foreign key constraint',
              field: [error.meta?.field_name || 'unknown'],
            },
          ],
          registeredClass: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during registered class update for ID ${registeredClassID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while updating the registered class',
              field: [],
            },
          ],
          registeredClass: null,
        }
      }
    }
  }

  async remove(registeredClassID: tbl_reg_class['id']) {
    try {
      if (!registeredClassID) {
        return {
          userErrors: [
            {
              message: 'Registered class ID is required to delete a registered class',
              field: ['id'],
            },
          ],
          registeredClass: null,
        }
      }
      this.logger.log(
        `Deleting registered class with ID: ${registeredClassID}`,
      )

      const registeredClass = await this.prisma.tbl_reg_class.delete({
        where: { id: registeredClassID },
      })

      this.logger.log(
        `Registered class deleted successfully with ID: ${registeredClassID}`,
      )
      return {
        userErrors: [],
        registeredClass,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Registered class deletion failed - Registered class with ID ${registeredClassID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Registered class not found',
              field: ['id'],
            },
          ],
          registeredClass: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Registered class deletion failed - Foreign key constraint violation for registered class ${registeredClassID}`,
        )
        return {
          userErrors: [
            {
              message:
                'Cannot delete registered class with existing related records',
              field: ['id'],
            },
          ],
          registeredClass: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during registered class deletion for ID ${registeredClassID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while deleting the registered class',
              field: [],
            },
          ],
          registeredClass: null,
        }
      }
    }
  }
}
