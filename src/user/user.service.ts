import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_user } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { UserInput } from './dto/user.input'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      this.logger.log('Fetching all users')
      const users = await this.prisma.tbl_user.findMany()

      // Remove passwords from all users
      const usersWithoutPasswords = users.map((user) => {
        if (Object.prototype.hasOwnProperty.call(user, 'password')) {
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        }
        return user
      })

      return usersWithoutPasswords
    }
    catch (error: any) {
      this.logger.error('Failed to fetch all users', error)
      throw new InternalServerErrorException('Failed to fetch users')
    }
  }

  async findOne(userID?: tbl_user['id'], email?: tbl_user['email']) {
    try {
      this.logger.log(
        `Finding user by ${userID ? `ID: ${userID}` : `email: ${email}`}`,
      )

      if (!userID && !email) {
        this.logger.warn('FindOne called without userID or email parameters')
        throw new BadRequestException(
          'Either userID or email must be provided',
        )
      }

      let response: tbl_user

      if (userID) {
        response = await this.prisma.tbl_user.findUnique({
          where: { id: userID },
        })
      }
      else if (email) {
        response = await this.prisma.tbl_user.findUnique({
          where: { email },
        })
      }

      if (!response) {
        this.logger.warn(
          `User not found with ${userID ? `ID: ${userID}` : `email: ${email}`}`,
        )
        throw new NotFoundException('User not found')
      }

      // Remove password from response
      if (Object.prototype.hasOwnProperty.call(response, 'password')) {
        const { password, ...user } = response
        return user
      }
      else {
        return response
      }
    }
    catch (error: any) {
      // Re-throw known exceptions
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to find user by ${userID ? `ID: ${userID}` : `email: ${email}`}`,
        error,
      )
      throw new InternalServerErrorException('Failed to retrieve user')
    }
  }

  async update(userID: tbl_user['id'], userInput: UserInput) {
    try {
      this.logger.log(`Updating user ${userID}`)

      const user = await this.prisma.tbl_user.update({
        where: { id: userID },
        data: { ...userInput },
      })

      // Remove password from response
      const { password, ...userWithoutPassword } = user

      return {
        userErrors: [],
        user: userWithoutPassword,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `User update failed - User with ID ${userID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'User not found',
              field: ['id'],
            },
          ],
          user: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(
          `User update failed - Unique constraint violation: ${error.meta?.target} already exists`,
        )
        return {
          userErrors: [
            {
              message: 'Email address is already taken',
              field: ['email'],
            },
          ],
          user: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during user update for ID ${userID}`,
          error,
        )
        return {
          userErrors: [
            {
              message: 'An unexpected error occurred while updating the user',
              field: [],
            },
          ],
          user: null,
        }
      }
    }
  }

  async remove(userID: tbl_user['id']) {
    try {
      this.logger.log(`Deleting user ${userID}`)

      const user = await this.prisma.tbl_user.delete({
        where: { id: userID },
      })

      // Remove password from response
      const { password, ...userWithoutPassword } = user

      return {
        userErrors: [],
        user: userWithoutPassword,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(
          `User deletion failed - User with ID ${userID} not found`,
        )
        return {
          userErrors: [
            {
              message: 'User not found',
              field: ['id'],
            },
          ],
          user: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(
          `User deletion failed - Foreign key constraint violation for user ${userID}`,
        )
        return {
          userErrors: [
            {
              message:
                'Cannot delete user with existing registrations or orders',
              field: ['id'],
            },
          ],
          user: null,
        }
      }
      else {
        this.logger.error(
          `Unexpected error during user deletion for ID ${userID}`,
          error,
        )
        return {
          userErrors: [
            {
              message: 'An unexpected error occurred while deleting the user',
              field: [],
            },
          ],
          user: null,
        }
      }
    }
  }
}
