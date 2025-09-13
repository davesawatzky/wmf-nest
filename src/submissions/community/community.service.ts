import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { tbl_reg_community, tbl_registration } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { CommunityInput } from './dto/community.input'

@Injectable()
export class CommunityService {
  private readonly logger = new Logger(CommunityService.name)

  constructor(private prisma: PrismaService) {}

  async create(
    registrationID: tbl_registration['id'],
    communityInput?: Partial<CommunityInput>,
  ) {
    try {
      this.logger.log(`Creating community for registration ID: ${registrationID}`)

      const community = await this.prisma.tbl_reg_community.create({
        data: { regID: registrationID, ...communityInput },
      })

      this.logger.log(`Community created successfully with ID: ${community.id}`)
      return {
        userErrors: [],
        community,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(`Community creation failed - Invalid registration ID: ${registrationID}`)
        return {
          userErrors: [{
            message: 'Cannot create community. Invalid registration ID',
            field: ['registrationId'],
          }],
          community: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Community creation failed - Unique constraint violation for registration ${registrationID}`)
        return {
          userErrors: [{
            message: 'Community already exists for this registration',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          community: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during community creation for registration ${registrationID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while creating the community',
            field: [],
          }],
          community: null,
        }
      }
    }
  }

  async findAll() {
    try {
      this.logger.log('Fetching all communities')
      return await this.prisma.tbl_reg_community.findMany()
    }
    catch (error: any) {
      this.logger.error('Error fetching all communities', error)
      throw new InternalServerErrorException('Unable to fetch communities')
    }
  }

  async findOne(
    registrationID?: tbl_reg_community['id'],
    communityID?: tbl_reg_community['id'],
  ) {
    try {
      if (!registrationID && !communityID) {
        this.logger.warn('findOne called without registrationID or communityID')
        throw new BadRequestException('Either registrationID or communityID must be provided')
      }

      this.logger.log(`Finding community with registrationID: ${registrationID}, communityID: ${communityID}`)

      // Build where clause conditionally
      const whereClause: any = {}
      if (registrationID) {
        whereClause.regID = registrationID
      }
      if (communityID) {
        whereClause.id = communityID
      }

      const community = await this.prisma.tbl_reg_community.findUnique({
        where: whereClause,
      })

      if (!community) {
        this.logger.warn(`Community not found with registrationID: ${registrationID}, communityID: ${communityID}`)
        throw new NotFoundException('Community not found')
      }

      return community
    }
    catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error
      }
      this.logger.error(`Error finding community with registrationID: ${registrationID}, communityID: ${communityID}`, error)
      throw new InternalServerErrorException('Unable to find community')
    }
  }

  async update(
    communityID: tbl_reg_community['id'],
    communityInput: Partial<CommunityInput>,
  ) {
    try {
      this.logger.log(`Updating community with ID: ${communityID}`)

      const community = await this.prisma.tbl_reg_community.update({
        where: { id: communityID },
        data: { ...communityInput },
      })

      this.logger.log(`Community updated successfully with ID: ${communityID}`)
      return {
        userErrors: [],
        community,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Community update failed - Community with ID ${communityID} not found`)
        return {
          userErrors: [{
            message: 'Community not found',
            field: ['id'],
          }],
          community: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Community update failed - Unique constraint violation for community ${communityID}`)
        return {
          userErrors: [{
            message: 'Community update violates unique constraint',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          community: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Community update failed - Foreign key constraint violation for community ${communityID}`)
        return {
          userErrors: [{
            message: 'Community update violates foreign key constraint',
            field: [error.meta?.field_name || 'unknown'],
          }],
          community: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during community update for ID ${communityID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while updating the community',
            field: [],
          }],
          community: null,
        }
      }
    }
  }

  async remove(communityID: tbl_reg_community['id']) {
    try {
      this.logger.log(`Deleting community with ID: ${communityID}`)

      const community = await this.prisma.tbl_reg_community.delete({
        where: { id: communityID },
      })

      this.logger.log(`Community deleted successfully with ID: ${communityID}`)
      return {
        userErrors: [],
        community,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Community deletion failed - Community with ID ${communityID} not found`)
        return {
          userErrors: [{
            message: 'Community not found',
            field: ['id'],
          }],
          community: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Community deletion failed - Foreign key constraint violation for community ${communityID}`)
        return {
          userErrors: [{
            message: 'Cannot delete community with existing related records',
            field: ['id'],
          }],
          community: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during community deletion for ID ${communityID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while deleting the community',
            field: [],
          }],
          community: null,
        }
      }
    }
  }
}
