import { Injectable } from '@nestjs/common'
import { CreateLevelInput } from './dto/create-level.input'
import { UpdateLevelInput } from './dto/update-level.input'

@Injectable()
export class LevelService {
  create(createLevelInput: CreateLevelInput) {
    return 'This action adds a new level'
  }

  findAll() {
    return `This action returns all level`
  }

  findOne(id: number) {
    return `This action returns a #${id} level`
  }

  update(id: number, updateLevelInput: UpdateLevelInput) {
    return `This action updates a #${id} level`
  }

  remove(id: number) {
    return `This action removes a #${id} level`
  }
}
