import { Injectable } from '@nestjs/common'
import { CreateSubdisciplineInput } from './dto/create-subdiscipline.input'
import { UpdateSubdisciplineInput } from './dto/update-subdiscipline.input'

@Injectable()
export class SubdisciplineService {
  create(createSubdisciplineInput: CreateSubdisciplineInput) {
    return 'This action adds a new subdiscipline'
  }

  findAll() {
    return `This action returns all subdiscipline`
  }

  findOne(id: number) {
    return `This action returns a #${id} subdiscipline`
  }

  update(id: number, updateSubdisciplineInput: UpdateSubdisciplineInput) {
    return `This action updates a #${id} subdiscipline`
  }

  remove(id: number) {
    return `This action removes a #${id} subdiscipline`
  }
}
