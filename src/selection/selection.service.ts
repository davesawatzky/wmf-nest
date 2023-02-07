import { Injectable } from '@nestjs/common'
import { CreateSelectionInput } from './dto/create-selection.input'
import { UpdateSelectionInput } from './dto/update-selection.input'

@Injectable()
export class SelectionService {
  create(createSelectionInput: CreateSelectionInput) {
    return 'This action adds a new selection'
  }

  findAll() {
    return `This action returns all selection`
  }

  findOne(id: number) {
    return `This action returns a #${id} selection`
  }

  update(id: number, updateSelectionInput: UpdateSelectionInput) {
    return `This action updates a #${id} selection`
  }

  remove(id: number) {
    return `This action removes a #${id} selection`
  }
}
