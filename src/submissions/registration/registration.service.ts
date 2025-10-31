import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_registration, tbl_user } from '@prisma/client'
import { PerformerType } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { RegistrationInput } from './dto/registration.input'

@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name)

  constructor(
    private prisma: PrismaService,
    // private searchFilterService: SearchFilterService,
  ) {}

  async create(
    userID: tbl_registration['userID'],
    performerType: PerformerType,
    label: tbl_registration['label'],
  ) {
    try {
      this.logger.log(
        `Creating registration for user ID: ${userID}, performerType: ${performerType}, label: ${label}`,
      )

      const registration = await this.prisma.tbl_registration.create({
        data: {
          userID,
          performerType,
          label,
        },
      })

      this.logger.log(
        `Registration created successfully with ID: ${registration.id}`,
      )
      return {
        userErrors: [],
        registration,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(
          `Registration creation failed - Invalid user ID: ${userID}`,
        )
        return {
          userErrors: [
            {
              message: 'Cannot create registration. Invalid user ID',
              field: ['userID'],
            },
          ],
          registration: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Registration creation failed - Unique constraint violation for user ${userID}`,
        )
        return {
          userErrors: [
            {
              message: 'Registration already exists for this user',
              field: [error.meta?.target?.[0] || 'unknown'],
            },
          ],
          registration: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during registration creation for user ${userID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while creating the registration',
              field: [],
            },
          ],
          registration: null,
        }
      }
    }
  }

  async findAll(
    userID?: tbl_user['id'],
    performerType?: PerformerType,
    teacherID?: tbl_user['id'],
    // skip?: number,
    // take?: number,
    // sortField?: string,
    // sortOrder?: 'asc' | 'desc',
    // searchFilters?: RegistrationSearchFilters,
  ) {
    try {
      this.logger.log(
        `Fetching registrations with filters - userID: ${userID}, performerType: ${performerType}, teacherID: ${teacherID}`,
      )

      // Create base where clause with standard filters
      const where: any = {}
      if (userID)
        where.userID = userID
      if (performerType)
        where.performerType = performerType
      if (teacherID)
        where.teacherID = teacherID

      // Apply search filters through our service
      // const searchFilterWhere = this.searchFilterService.buildWhereClause(searchFilters)

      // Merge the base where clause with the search filter where clause
      const mergedWhere = { ...where }

      // Add AND conditions if they exist
      // if (searchFilterWhere.AND && searchFilterWhere.AND.length > 0) {
      //   mergedWhere.AND = mergedWhere.AND || []
      //   mergedWhere.AND.push(...searchFilterWhere.AND)
      // }

      // // Add OR conditions if they exist
      // if (searchFilterWhere.OR && searchFilterWhere.OR.length > 0) {
      //   mergedWhere.OR = mergedWhere.OR || []
      //   mergedWhere.OR.push(...searchFilterWhere.OR)
      // }

      const result = await this.prisma.tbl_registration.findMany({
        // skip,
        // take,
        where: mergedWhere,
        // orderBy: {
        // [sortField || 'createdAt']: sortOrder || undefined,
        // },
      })
      return result
    }
    catch (error: any) {
      this.logger.error(
        `Error fetching registrations with filters - userID: ${userID}, performerType: ${performerType}, teacherID: ${teacherID}`,
        error,
      )
      throw new InternalServerErrorException('Unable to fetch registrations')
    }
  }

  async findOne(id: tbl_registration['id']) {
    try {
      if (!id) {
        this.logger.warn('findOne called without registration ID')
        throw new BadRequestException('Registration ID must be provided')
      }

      this.logger.log(`Finding registration with ID: ${id}`)

      const registration = await this.prisma.tbl_registration.findUnique({
        where: { id },
      })

      if (!registration) {
        this.logger.warn(`Registration not found with ID: ${id}`)
        throw new NotFoundException('Registration not found')
      }

      return registration
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }
      this.logger.error(`Error finding registration with ID: ${id}`, error)
      throw new InternalServerErrorException('Unable to find registration')
    }
  }

  async update(
    registrationID: tbl_registration['id'],
    registrationInput: Partial<RegistrationInput>,
  ) {
    try {
      this.logger.log(`Updating registration with ID: ${registrationID}`)

      const registration = await this.prisma.tbl_registration.update({
        where: { id: registrationID },
        data: { ...registrationInput },
      })

      this.logger.log(
        `Registration updated successfully with ID: ${registrationID}`,
      )
      return {
        userErrors: [],
        registration,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Registration update failed - Registration with ID ${registrationID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Registration not found',
              field: ['id'],
            },
          ],
          registration: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Registration update failed - Unique constraint violation for registration ${registrationID}`,
        )
        return {
          userErrors: [
            {
              message: 'Registration update violates unique constraint',
              field: [error.meta?.target?.[0] || 'unknown'],
            },
          ],
          registration: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Registration update failed - Foreign key constraint violation for registration ${registrationID}`,
        )
        return {
          userErrors: [
            {
              message: 'Registration update violates foreign key constraint',
              field: [error.meta?.field_name || 'unknown'],
            },
          ],
          registration: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during registration update for ID ${registrationID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while updating the registration',
              field: [],
            },
          ],
          registration: null,
        }
      }
    }
  }

  async remove(id: tbl_registration['id']) {
    try {
      this.logger.log(`Deleting registration with ID: ${id}`)

      const registration = await this.prisma.tbl_registration.delete({
        where: { id },
      })

      this.logger.log(`Registration deleted successfully with ID: ${id}`)
      return {
        userErrors: [],
        registration,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Registration deletion failed - Registration with ID ${id} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Registration not found',
              field: ['id'],
            },
          ],
          registration: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Registration deletion failed - Foreign key constraint violation for registration ${id}`,
        )
        return {
          userErrors: [
            {
              message:
                'Cannot delete registration with existing related records',
              field: ['id'],
            },
          ],
          registration: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during registration deletion for ID ${id}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while deleting the registration',
              field: [],
            },
          ],
          registration: null,
        }
      }
    }
  }
}
