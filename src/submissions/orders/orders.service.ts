import { Injectable } from '@nestjs/common'
import { OrderInput } from './dto/order.input'

@Injectable()
export class OrdersService {
  create(orderInput: OrderInput) {
    return 'This action adds a new order'
  }

  findAll() {
    return `This action returns all orders`
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  update(id: number, orderInput: OrderInput) {
    return `This action updates a #${id} order`
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
