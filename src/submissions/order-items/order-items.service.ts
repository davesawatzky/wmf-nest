import { Injectable } from '@nestjs/common'
import { OrderItemInput } from './dto/order-item.input'

@Injectable()
export class OrderItemsService {
  create(orderItemInput: OrderItemInput) {
    return 'This action adds a new orderItem'
  }

  findAll() {
    return `This action returns all orderItems`
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`
  }

  update(id: number, orderItemInput: OrderItemInput) {
    return `This action updates a #${id} orderItem`
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`
  }
}
