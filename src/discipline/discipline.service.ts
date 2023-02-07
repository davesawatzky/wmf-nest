import { Injectable } from '@nestjs/common'
import { CreateDisciplineInput } from './dto/create-discipline.input'
import { UpdateDisciplineInput } from './dto/update-discipline.input'

@Injectable()
export class DisciplineService {
  create(createDisciplineInput: CreateDisciplineInput) {
    return 'This action adds a new discipline'
  }

  findAll() {
    return `This action returns all discipline`
  }

  findOne(id: number) {
    return `This action returns a #${id} discipline`
  }

  update(id: number, updateDisciplineInput: UpdateDisciplineInput) {
    return `This action updates a #${id} discipline`
  }

  remove(id: number) {
    return `This action removes a #${id} discipline`
  }
}
