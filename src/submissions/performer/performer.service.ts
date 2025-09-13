import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { tbl_reg_class, tbl_reg_performer, tbl_registration } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { PerformerInput } from './dto/performer.input'

@Injectable()
export class PerformerService {
  private readonly logger = new Logger(PerformerService.name)

  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    performerInput?: Partial<PerformerInput>,
  ) {
    try {
      this.logger.log(`Creating performer for registration ID: ${registrationID}`)

      const performer = await this.prisma.tbl_reg_performer.create({
        data: { regID: registrationID, ...performerInput },
      })

      this.logger.log(`Performer created successfully with ID: ${performer.id}`)
      return {
        userErrors: [],
        performer,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(`Performer creation failed - Invalid registration ID: ${registrationID}`)
        return {
          userErrors: [{
            message: 'Cannot create performer. Invalid registration ID',
            field: ['registrationId'],
          }],
          performer: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Performer creation failed - Unique constraint violation for registration ${registrationID}`)
        return {
          userErrors: [{
            message: 'Performer already exists for this registration',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          performer: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during performer creation for registration ${registrationID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while creating the performer',
            field: [],
          }],
          performer: null,
        }
      }
    }
  }

  async findAll(
    registrationID?: tbl_registration['id'],
    classNumber?: tbl_reg_class['classNumber'],
  ) {
    try {
      this.logger.log(`Fetching performers with filters - registrationID: ${registrationID}, classNumber: ${classNumber}`)

      if (registrationID) {
        return await this.prisma.tbl_reg_performer.findMany({
          where: { regID: registrationID },
        })
      }
      else if (classNumber) {
        const registeredClassIds = await this.prisma.tbl_reg_class.findMany({
          where: {
            classNumber,
          },
          select: { regID: true },
        })
        const performerIds = registeredClassIds.map(item => item.regID).filter(item => !!item)
        return await this.prisma.tbl_reg_performer.findMany({
          where: {
            regID: { in: performerIds },
          },
        })
      }
      else {
        const confirmedRegistrations = await this.prisma.tbl_registration.findMany({
          where: {
            confirmation: {
              not: null,
            },
          },
        })
        const performerIds = confirmedRegistrations.map(item => item.id)
        return await this.prisma.tbl_reg_performer.findMany({
          where: {
            regID: { in: performerIds },
          },
        })
      }
    }
    catch (error: any) {
      this.logger.error(`Error fetching performers with filters - registrationID: ${registrationID}, classNumber: ${classNumber}`, error)
      throw new InternalServerErrorException('Unable to fetch performers')
    }
  }

  async findOne(
    performerID: tbl_reg_performer['id'],
  ) {
    try {
      if (!performerID) {
        this.logger.warn('findOne called without performer ID')
        throw new BadRequestException('Performer ID must be provided')
      }

      this.logger.log(`Finding performer with ID: ${performerID}`)

      const performer = await this.prisma.tbl_reg_performer.findUnique({
        where: {
          id: performerID,
        },
      })

      if (!performer) {
        this.logger.warn(`Performer not found with ID: ${performerID}`)
        throw new NotFoundException('Performer not found')
      }

      return performer
    }
    catch (error: any) {
      this.logger.error(`Error finding performer with ID: ${performerID}`, error)
      throw new InternalServerErrorException('Unable to find performer')
    }
  }

  async update(
    performerID: tbl_reg_performer['id'],
    performerInput: Partial<PerformerInput>,
  ) {
    try {
      this.logger.log(`Updating performer with ID: ${performerID}`)

      const performer = await this.prisma.tbl_reg_performer.update({
        where: { id: performerID },
        data: { ...performerInput },
      })

      this.logger.log(`Performer updated successfully with ID: ${performerID}`)
      return {
        userErrors: [],
        performer,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Performer update failed - Performer with ID ${performerID} not found`)
        return {
          userErrors: [{
            message: 'Performer not found',
            field: ['id'],
          }],
          performer: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Performer update failed - Unique constraint violation for performer ${performerID}`)
        return {
          userErrors: [{
            message: 'Performer update violates unique constraint',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          performer: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Performer update failed - Foreign key constraint violation for performer ${performerID}`)
        return {
          userErrors: [{
            message: 'Performer update violates foreign key constraint',
            field: [error.meta?.field_name || 'unknown'],
          }],
          performer: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during performer update for ID ${performerID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while updating the performer',
            field: [],
          }],
          performer: null,
        }
      }
    }
  }

  async remove(performerID: tbl_reg_performer['id']) {
    try {
      this.logger.log(`Deleting performer with ID: ${performerID}`)

      const performer = await this.prisma.tbl_reg_performer.delete({
        where: { id: performerID },
      })

      this.logger.log(`Performer deleted successfully with ID: ${performerID}`)
      return {
        userErrors: [],
        performer,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Performer deletion failed - Performer with ID ${performerID} not found`)
        return {
          userErrors: [{
            message: 'Performer not found',
            field: ['id'],
          }],
          performer: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Performer deletion failed - Foreign key constraint violation for performer ${performerID}`)
        return {
          userErrors: [{
            message: 'Cannot delete performer with existing related records',
            field: ['id'],
          }],
          performer: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during performer deletion for ID ${performerID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while deleting the performer',
            field: [],
          }],
          performer: null,
        }
      }
    }
  }
}
