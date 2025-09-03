import { Injectable } from '@nestjs/common'
import { tbl_order, tbl_user } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { OrderInput } from './dto/order.input'

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    userID?: tbl_user['id'],
  ) {
    return await this.prisma.tbl_order.findMany({
      where: { userID },
    })
  }

  async findOne(userID: tbl_user['id'], orderID: tbl_order['id']) {
    return await this.prisma.tbl_order.findUnique({
      where: { userID, id: orderID },
    })
  }

  async create(userID: tbl_user['id'], orderInput: Partial<OrderInput>) {
    return {
      userErrors: [],
      order: await this.prisma.tbl_order.create({
        data: {
          userID,
          totalAmount: orderInput.totalAmount,
          purchaseDate: orderInput.purchaseDate,
        },
      }),
    }
  }

  async update(orderID: tbl_order['id'], orderInput: Partial<OrderInput>) {
    return {
      userErrors: [],
      order: await this.prisma.tbl_order.update({
        where: { id: orderID },
        data: {
          totalAmount: orderInput.totalAmount,
          payedAmount: orderInput.payedAmount,
          purchaseDate: orderInput.purchaseDate,
          deliveryDate: orderInput.deliveryDate,
          methodDelivered: orderInput.methodDelivered,
        },
      }),
    }
  }

  async remove(orderID: tbl_order['id']) {
    return await this.prisma.tbl_order.delete({
      where: { id: orderID },
    })
  }
}
