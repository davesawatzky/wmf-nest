import { Injectable } from '@nestjs/common'
import { ItemInput } from './dto/item.input'

@Injectable()
export class ItemsService {
  create(ItemInput: ItemInput) {
    return 'This action adds a new item'
  }

  findAll() {
    return `This action returns all items`
  }

  findOne(id: number) {
    return `This action returns a #${id} item`
  }

  update(id: number, ItemInput: ItemInput) {
    return `This action updates a #${id} item`
  }

  remove(id: number) {
    return `This action removes a #${id} item`
  }
}
