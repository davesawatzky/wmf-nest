import { Injectable } from '@nestjs/common'
import { CreateFestivalClassInput } from './dto/create-festival-class.input'
import { UpdateFestivalClassInput } from './dto/update-festival-class.input'

@Injectable()
export class FestivalClassService {
  create(createFestivalClassInput: CreateFestivalClassInput) {
    return 'This action adds a new festivalClass'
  }

  findAll() {
    return `This action returns all festivalClass`
  }

  findOne(id: number) {
    return `This action returns a #${id} festivalClass`
  }

  update(id: number, updateFestivalClassInput: UpdateFestivalClassInput) {
    return `This action updates a #${id} festivalClass`
  }

  remove(id: number) {
    return `This action removes a #${id} festivalClass`
  }
}
