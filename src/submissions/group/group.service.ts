import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { tbl_reg_group, tbl_registration } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { GroupInput } from './dto/group.input'

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name)

  constructor(private prisma: PrismaService) {}

  async create(registrationID: tbl_registration['id']) {
    try {
      this.logger.log(`Creating group for registration ID: ${registrationID}`)

      const group = await this.prisma.tbl_reg_group.create({
        data: {
          regID: registrationID,
        },
      })

      this.logger.log(`Group created successfully with ID: ${group.id}`)
      return {
        userErrors: [],
        group,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(`Group creation failed - Invalid registration ID: ${registrationID}`)
        return {
          userErrors: [{
            message: 'Cannot create group. Invalid registration ID',
            field: ['registrationId'],
          }],
          group: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Group creation failed - Unique constraint violation for registration ${registrationID}`)
        return {
          userErrors: [{
            message: 'Group already exists for this registration',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          group: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during group creation for registration ${registrationID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while creating the group',
            field: [],
          }],
          group: null,
        }
      }
    }
  }

  async findAll(registrationID?: tbl_registration['id']) {
    try {
      this.logger.log(`Fetching groups with filter - registrationID: ${registrationID}`)

      return await this.prisma.tbl_reg_group.findMany({
        where: { regID: registrationID },
      })
    }
    catch (error: any) {
      this.logger.error(`Error fetching groups with filter - registrationID: ${registrationID}`, error)
      throw new InternalServerErrorException('Unable to fetch groups')
    }
  }

  async findOne(
    registrationID?: tbl_registration['id'],
    groupID?: tbl_reg_group['id'],
  ) {
    try {
      if (!registrationID && !groupID) {
        this.logger.warn('findOne called without registrationID or groupID')
        throw new BadRequestException('Either registrationID or groupID must be provided')
      }

      this.logger.log(`Finding group with registrationID: ${registrationID}, groupID: ${groupID}`)

      // Build where clause conditionally
      const whereClause: any = {}
      if (registrationID) {
        whereClause.regID = registrationID
      }
      if (groupID) {
        whereClause.id = groupID
      }

      const group = await this.prisma.tbl_reg_group.findUnique({
        where: whereClause,
      })

      if (!group) {
        this.logger.warn(`Group not found with registrationID: ${registrationID}, groupID: ${groupID}`)
        throw new NotFoundException('Group not found')
      }

      return group
    }
    catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error
      }
      this.logger.error(`Error finding group with registrationID: ${registrationID}, groupID: ${groupID}`, error)
      throw new InternalServerErrorException('Unable to find group')
    }
  }

  async update(groupID: tbl_reg_group['id'], groupInput: Partial<GroupInput>) {
    try {
      this.logger.log(`Updating group with ID: ${groupID}`)

      const group = await this.prisma.tbl_reg_group.update({
        where: { id: groupID },
        data: { ...groupInput },
      })

      this.logger.log(`Group updated successfully with ID: ${groupID}`)
      return {
        userErrors: [],
        group,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Group update failed - Group with ID ${groupID} not found`)
        return {
          userErrors: [{
            message: 'Group not found',
            field: ['id'],
          }],
          group: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Group update failed - Unique constraint violation for group ${groupID}`)
        return {
          userErrors: [{
            message: 'Group update violates unique constraint',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          group: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Group update failed - Foreign key constraint violation for group ${groupID}`)
        return {
          userErrors: [{
            message: 'Group update violates foreign key constraint',
            field: [error.meta?.field_name || 'unknown'],
          }],
          group: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during group update for ID ${groupID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while updating the group',
            field: [],
          }],
          group: null,
        }
      }
    }
  }

  async remove(groupID: tbl_reg_group['id']) {
    try {
      this.logger.log(`Deleting group with ID: ${groupID}`)

      const group = await this.prisma.tbl_reg_group.delete({
        where: { id: groupID },
      })

      this.logger.log(`Group deleted successfully with ID: ${groupID}`)
      return {
        userErrors: [],
        group,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Group deletion failed - Group with ID ${groupID} not found`)
        return {
          userErrors: [{
            message: 'Group not found',
            field: ['id'],
          }],
          group: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Group deletion failed - Foreign key constraint violation for group ${groupID}`)
        return {
          userErrors: [{
            message: 'Cannot delete group with existing related records',
            field: ['id'],
          }],
          group: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during group deletion for ID ${groupID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while deleting the group',
            field: [],
          }],
          group: null,
        }
      }
    }
  }
}
