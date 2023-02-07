import { Injectable } from '@nestjs/common'
import { CreatePerformerInput } from './dto/create-performer.input'
import { UpdatePerformerInput } from './dto/update-performer.input'

@Injectable()
export class PerformerService {
  create(createPerformerInput: CreatePerformerInput) {
    return 'This action adds a new performer'
  }

  findAll() {
    return `This action returns all performer`
  }

  findOne(id: number) {
    return `This action returns a #${id} performer`
  }

  update(id: number, updatePerformerInput: UpdatePerformerInput) {
    return `This action updates a #${id} performer`
  }

  remove(id: number) {
    return `This action removes a #${id} performer`
  }
}
