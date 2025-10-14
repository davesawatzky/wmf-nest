import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_reg_community, tbl_reg_communitygroup } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { CommunityGroupInput } from './dto/community-group.input'

@Injectable()
export class CommunityGroupService {
  private readonly logger = new Logger(CommunityGroupService.name)

  constructor(private prisma: PrismaService) {}

  async create(
    communityID: tbl_reg_community['id'],
    communityGroupInput?: Partial<CommunityGroupInput>,
  ) {
    try {
      this.logger.log(
        `Creating community group for community ID: ${communityID}`,
      )

      const communityGroup = await this.prisma.tbl_reg_communitygroup.create({
        data: { communityID, ...communityGroupInput },
      })

      this.logger.log(
        `Community group created successfully with ID: ${communityGroup.id}`,
      )
      return {
        userErrors: [],
        communityGroup,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(
          `Community group creation failed - Invalid community ID: ${communityID}`,
        )
        return {
          userErrors: [
            {
              message: 'Cannot create community group. Invalid community ID',
              field: ['communityId'],
            },
          ],
          communityGroup: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Community group creation failed - Unique constraint violation for community ${communityID}`,
        )
        return {
          userErrors: [
            {
              message: 'Community group already exists for this community',
              field: [error.meta?.target?.[0] || 'unknown'],
            },
          ],
          communityGroup: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during community group creation for community ${communityID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while creating the community group',
              field: [],
            },
          ],
          communityGroup: null,
        }
      }
    }
  }

  async findAll(communityID?: tbl_reg_communitygroup['communityID']) {
    try {
      this.logger.log(
        `Fetching community groups with filter - communityID: ${communityID}`,
      )

      return await this.prisma.tbl_reg_communitygroup.findMany({
        where: { communityID },
      })
    }
    catch (error: any) {
      this.logger.error(
        `Error fetching community groups with filter - communityID: ${communityID}`,
        error,
      )
      // throw new InternalServerErrorException(
      //   'Unable to fetch community groups',
      // )
    }
  }

  async findOne(communityGroupID: tbl_reg_communitygroup['id']) {
    try {
      if (!communityGroupID) {
        this.logger.warn('findOne called without community group ID')
        // throw new BadRequestException('Community group ID must be provided')
      }

      this.logger.log(`Finding community group with ID: ${communityGroupID}`)

      const communityGroup
        = await this.prisma.tbl_reg_communitygroup.findUnique({
          where: { id: communityGroupID },
        })

      if (!communityGroup) {
        this.logger.warn(
          `Community group not found with ID: ${communityGroupID}`,
        )
        // throw new NotFoundException('Community group not found')
      }

      return communityGroup
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        // throw error
      }
      this.logger.error(
        `Error finding community group with ID: ${communityGroupID}`,
        error,
      )
      // throw new InternalServerErrorException('Unable to find community group')
    }
  }

  async update(
    communityGroupID: tbl_reg_communitygroup['id'],
    communityGroupInput: Partial<CommunityGroupInput>,
  ) {
    try {
      this.logger.log(`Updating community group with ID: ${communityGroupID}`)

      const communityGroup = await this.prisma.tbl_reg_communitygroup.update({
        where: { id: communityGroupID },
        data: { ...communityGroupInput },
      })

      this.logger.log(
        `Community group updated successfully with ID: ${communityGroupID}`,
      )
      return {
        userErrors: [],
        communityGroup,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Community group update failed - Community group with ID ${communityGroupID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Community group not found',
              field: ['id'],
            },
          ],
          communityGroup: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `Community group update failed - Unique constraint violation for community group ${communityGroupID}`,
        )
        return {
          userErrors: [
            {
              message: 'Community group update violates unique constraint',
              field: [error.meta?.target?.[0] || 'unknown'],
            },
          ],
          communityGroup: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Community group update failed - Foreign key constraint violation for community group ${communityGroupID}`,
        )
        return {
          userErrors: [
            {
              message: 'Community group update violates foreign key constraint',
              field: [error.meta?.field_name || 'unknown'],
            },
          ],
          communityGroup: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during community group update for ID ${communityGroupID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while updating the community group',
              field: [],
            },
          ],
          communityGroup: null,
        }
      }
    }
  }

  async remove(communityGroupID: tbl_reg_communitygroup['id']) {
    try {
      this.logger.log(`Deleting community group with ID: ${communityGroupID}`)

      const communityGroup = await this.prisma.tbl_reg_communitygroup.delete({
        where: { id: communityGroupID },
      })

      this.logger.log(
        `Community group deleted successfully with ID: ${communityGroupID}`,
      )
      return {
        userErrors: [],
        communityGroup,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `Community group deletion failed - Community group with ID ${communityGroupID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'Community group not found',
              field: ['id'],
            },
          ],
          communityGroup: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `Community group deletion failed - Foreign key constraint violation for community group ${communityGroupID}`,
        )
        return {
          userErrors: [
            {
              message:
                'Cannot delete community group with existing related records',
              field: ['id'],
            },
          ],
          communityGroup: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during community group deletion for ID ${communityGroupID}`,
          error,
        )
        return {
          userErrors: [
            {
              message:
                'An unexpected error occurred while deleting the community group',
              field: [],
            },
          ],
          communityGroup: null,
        }
      }
    }
  }
}
