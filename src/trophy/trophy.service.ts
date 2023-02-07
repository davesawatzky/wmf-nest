import { Injectable } from '@nestjs/common'
import { CreateTrophyInput } from './dto/create-trophy.input'
import { UpdateTrophyInput } from './dto/update-trophy.input'

@Injectable()
export class TrophyService {
  create(createTrophyInput: CreateTrophyInput) {
    return 'This action adds a new trophy'
  }

  findAll() {
    return `This action returns all trophy`
  }

  findOne(id: number) {
    return `This action returns a #${id} trophy`
  }

  update(id: number, updateTrophyInput: UpdateTrophyInput) {
    return `This action updates a #${id} trophy`
  }

  remove(id: number) {
    return `This action removes a #${id} trophy`
  }
}
