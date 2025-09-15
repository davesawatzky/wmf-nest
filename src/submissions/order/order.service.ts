import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { tbl_order, tbl_user } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { OrderInput } from './dto/order.input'

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name)

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    userID?: tbl_user['id'],
  ) {
    try {
      this.logger.log(`Fetching orders with filter - userID: ${userID}`)

      return await this.prisma.tbl_order.findMany({
        where: { userID },
      })
    }
    catch (error: any) {
      this.logger.error(`Error fetching orders with filter - userID: ${userID}`, error)
      throw new InternalServerErrorException('Unable to fetch orders')
    }
  }

  async findOne(orderID: tbl_order['id'], userID?: tbl_user['id']) {
    try {
      if (!orderID) {
        this.logger.warn('findOne called without order ID')
        throw new BadRequestException('Order ID must be provided')
      }

      this.logger.log(`Finding order with ID: ${orderID}, userID: ${userID}`)

      // Build where clause conditionally
      const whereClause: any = { id: orderID }
      if (userID) {
        whereClause.userID = userID
      }

      const order = await this.prisma.tbl_order.findUnique({
        where: whereClause,
      })

      if (!order) {
        this.logger.warn(`Order not found with ID: ${orderID}, userID: ${userID}`)
        throw new NotFoundException('Order not found')
      }

      return order
    }
    catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error
      }
      this.logger.error(`Error finding order with ID: ${orderID}, userID: ${userID}`, error)
      throw new InternalServerErrorException('Unable to find order')
    }
  }

  async create(userID: tbl_user['id'], orderInput: Partial<OrderInput>) {
    try {
      this.logger.log(`Creating order for user ID: ${userID}`)

      const order = await this.prisma.tbl_order.create({
        data: {
          userID,
          totalAmount: orderInput.totalAmount,
          purchaseDate: orderInput.purchaseDate,
        },
      })

      this.logger.log(`Order created successfully with ID: ${order.id}`)
      return {
        userErrors: [],
        order,
      }
    }
    catch (error: any) {
      if (error.code === 'P2003') {
        this.logger.warn(`Order creation failed - Invalid user ID: ${userID}`)
        return {
          userErrors: [{
            message: 'Cannot create order. Invalid user ID',
            field: ['userID'],
          }],
          order: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Order creation failed - Unique constraint violation for user ${userID}`)
        return {
          userErrors: [{
            message: 'Order creation violates unique constraint',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          order: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during order creation for user ${userID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while creating the order',
            field: [],
          }],
          order: null,
        }
      }
    }
  }

  async update(orderID: tbl_order['id'], orderInput: Partial<OrderInput>) {
    try {
      this.logger.log(`Updating order with ID: ${orderID}`)

      const order = await this.prisma.tbl_order.update({
        where: { id: orderID },
        data: {
          totalAmount: orderInput.totalAmount,
          payedAmount: orderInput.payedAmount,
          purchaseDate: orderInput.purchaseDate,
          deliveryDate: orderInput.deliveryDate,
          methodDelivered: orderInput.methodDelivered,
        },
      })

      this.logger.log(`Order updated successfully with ID: ${orderID}`)
      return {
        userErrors: [],
        order,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Order update failed - Order with ID ${orderID} not found`)
        return {
          userErrors: [{
            message: 'Order not found',
            field: ['id'],
          }],
          order: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Order update failed - Unique constraint violation for order ${orderID}`)
        return {
          userErrors: [{
            message: 'Order update violates unique constraint',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          order: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Order update failed - Foreign key constraint violation for order ${orderID}`)
        return {
          userErrors: [{
            message: 'Order update violates foreign key constraint',
            field: [error.meta?.field_name || 'unknown'],
          }],
          order: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during order update for ID ${orderID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while updating the order',
            field: [],
          }],
          order: null,
        }
      }
    }
  }

  async remove(orderID: tbl_order['id']) {
    try {
      this.logger.log(`Deleting order with ID: ${orderID}`)

      const order = await this.prisma.tbl_order.delete({
        where: { id: orderID },
      })

      this.logger.log(`Order deleted successfully with ID: ${orderID}`)
      return {
        userErrors: [],
        order,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Order deletion failed - Order with ID ${orderID} not found`)
        return {
          userErrors: [{
            message: 'Order not found',
            field: ['id'],
          }],
          order: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Order deletion failed - Foreign key constraint violation for order ${orderID}`)
        return {
          userErrors: [{
            message: 'Cannot delete order with existing related records',
            field: ['id'],
          }],
          order: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during order deletion for ID ${orderID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while deleting the order',
            field: [],
          }],
          order: null,
        }
      }
    }
  }
}
