import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { tbl_order_item } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { OrderItemInput } from './dto/order-item.input'

@Injectable()
export class OrderItemService {
  private readonly logger = new Logger(OrderItemService.name)

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(orderID: tbl_order_item['orderID']) {
    try {
      if (!orderID) {
        this.logger.warn('findAll called without order ID')
        throw new BadRequestException('Order ID must be provided')
      }

      this.logger.log(`Fetching all order items for order ID: ${orderID}`)

      return this.prisma.tbl_order_item.findMany({
        where: {
          orderID,
        },
      })
    }
    catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error
      }
      this.logger.error(`Error fetching order items for order ID: ${orderID}`, error)
      throw new InternalServerErrorException('Unable to fetch order items')
    }
  }

  async findOne(orderID: tbl_order_item['orderID'], itemID: tbl_order_item['itemID']) {
    try {
      if (!orderID || !itemID) {
        this.logger.warn(`findOne called with incomplete parameters - orderID: ${orderID}, itemID: ${itemID}`)
        throw new BadRequestException('Both order ID and item ID must be provided')
      }

      this.logger.log(`Finding order item with order ID: ${orderID}, item ID: ${itemID}`)

      const orderItem = await this.prisma.tbl_order_item.findUnique({
        where: {
          orderID_itemID: {
            orderID,
            itemID,
          },
        },
      })

      if (!orderItem) {
        this.logger.warn(`Order item not found with order ID: ${orderID}, item ID: ${itemID}`)
        throw new NotFoundException('Order item not found')
      }

      return orderItem
    }
    catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error
      }
      this.logger.error(`Error finding order item with order ID: ${orderID}, item ID: ${itemID}`, error)
      throw new InternalServerErrorException('Unable to find order item')
    }
  }

  async create(orderID: tbl_order_item['orderID'], orderItemInput: OrderItemInput) {
    try {
      this.logger.log(`Creating order item for order ID: ${orderID}, item ID: ${orderItemInput.itemID}`)

      const orderItem = await this.prisma.tbl_order_item.create({
        data: {
          orderID,
          ...orderItemInput,
        },
      })

      this.logger.log(`Order item created successfully for order ID: ${orderID}, item ID: ${orderItemInput.itemID}`)
      return {
        userErrors: [],
        orderItem,
      }
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        this.logger.warn(`Order item creation failed - Duplicate order item for order ${orderID}, item ${orderItemInput.itemID}`)
        return {
          userErrors: [{
            message: 'Order item already exists for this order and item combination',
            field: ['orderID', 'itemID'],
          }],
          orderItem: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Order item creation failed - Foreign key constraint violation for order ${orderID}, item ${orderItemInput.itemID}`)
        return {
          userErrors: [{
            message: 'Invalid order ID or item ID',
            field: [error.meta?.field_name || 'unknown'],
          }],
          orderItem: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during order item creation for order ${orderID}, item ${orderItemInput.itemID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while creating the order item',
            field: [],
          }],
          orderItem: null,
        }
      }
    }
  }

  async update(
    orderID: tbl_order_item['orderID'],
    itemID: tbl_order_item['itemID'],
    orderItemInput: OrderItemInput,
  ) {
    try {
      this.logger.log(`Updating order item with order ID: ${orderID}, item ID: ${itemID}`)

      const orderItem = await this.prisma.tbl_order_item.update({
        where: {
          orderID_itemID: {
            orderID,
            itemID,
          },
        },
        data: {
          ...orderItemInput,
        },
      })

      this.logger.log(`Order item updated successfully with order ID: ${orderID}, item ID: ${itemID}`)
      return {
        userErrors: [],
        orderItem,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Order item update failed - Order item not found with order ID ${orderID}, item ID ${itemID}`)
        return {
          userErrors: [{
            message: 'Order item not found',
            field: ['orderID', 'itemID'],
          }],
          orderItem: null,
        }
      }
      else if (error.code === 'P2002') {
        this.logger.warn(`Order item update failed - Unique constraint violation for order ${orderID}, item ${itemID}`)
        return {
          userErrors: [{
            message: 'Order item update violates unique constraint',
            field: [error.meta?.target?.[0] || 'unknown'],
          }],
          orderItem: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Order item update failed - Foreign key constraint violation for order ${orderID}, item ${itemID}`)
        return {
          userErrors: [{
            message: 'Order item update violates foreign key constraint',
            field: [error.meta?.field_name || 'unknown'],
          }],
          orderItem: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during order item update for order ID ${orderID}, item ID ${itemID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while updating the order item',
            field: [],
          }],
          orderItem: null,
        }
      }
    }
  }

  async remove(orderID: tbl_order_item['orderID'], itemID: tbl_order_item['itemID']) {
    try {
      this.logger.log(`Deleting order item with order ID: ${orderID}, item ID: ${itemID}`)

      const orderItem = await this.prisma.tbl_order_item.delete({
        where: {
          orderID_itemID: {
            orderID,
            itemID,
          },
        },
      })

      this.logger.log(`Order item deleted successfully with order ID: ${orderID}, item ID: ${itemID}`)
      return {
        userErrors: [],
        orderItem,
      }
    }
    catch (error: any) {
      if (error.code === 'P2025') {
        this.logger.warn(`Order item deletion failed - Order item not found with order ID ${orderID}, item ID ${itemID}`)
        return {
          userErrors: [{
            message: 'Order item not found',
            field: ['orderID', 'itemID'],
          }],
          orderItem: null,
        }
      }
      else if (error.code === 'P2003') {
        this.logger.warn(`Order item deletion failed - Foreign key constraint violation for order ${orderID}, item ${itemID}`)
        return {
          userErrors: [{
            message: 'Cannot delete order item with existing related records',
            field: ['orderID', 'itemID'],
          }],
          orderItem: null,
        }
      }
      else {
        this.logger.error(`Unexpected error during order item deletion for order ID ${orderID}, item ID ${itemID}`, error)
        return {
          userErrors: [{
            message: 'An unexpected error occurred while deleting the order item',
            field: [],
          }],
          orderItem: null,
        }
      }
    }
  }
}
