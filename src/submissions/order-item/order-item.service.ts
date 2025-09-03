import { Injectable } from '@nestjs/common'
import { tbl_order_item } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { OrderItemInput } from './dto/order-item.input'

@Injectable()
export class OrderItemService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(orderID: tbl_order_item['orderID']) {
    return this.prisma.tbl_order_item.findMany({
      where: {
        orderID,
      },
    })
  }

  async findOne(orderID: tbl_order_item['orderID'], itemID: tbl_order_item['itemID']) {
    return await this.prisma.tbl_order_item.findUnique({
      where: {
        orderID_itemID: {
          orderID,
          itemID,
        },
      },
    })
  }

  async create(orderID: tbl_order_item['orderID'], orderItemInput: OrderItemInput) {
    return {
      userErrors: [],
      orderItem: await this.prisma.tbl_order_item.create({
        data: {
          orderID,
          ...orderItemInput,
        },
      }),
    }
  }

  async update(
    orderID: tbl_order_item['orderID'],
    itemID: tbl_order_item['itemID'],
    orderItemInput: OrderItemInput,
  ) {
    return {
      userErrors: [],
      orderItem: await this.prisma.tbl_order_item.update({
        where: {
          orderID_itemID: {
            orderID,
            itemID,
          },
        },
        data: {
          ...orderItemInput,
        },
      }),
    }
  }

  async remove(orderID: tbl_order_item['orderID'], itemID: tbl_order_item['itemID']) {
    return await this.prisma.tbl_order_item.delete({
      where: {
        orderID_itemID: {
          orderID,
          itemID,
        },
      },
    })
  }
}
