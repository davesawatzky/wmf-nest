import { Injectable } from '@nestjs/common'
import { CreateRegisteredClassInput } from './dto/create-registered-class.input'
import { UpdateRegisteredClassInput } from './dto/update-registered-class.input'

@Injectable()
export class RegisteredClassService {
  create(createRegisteredClassInput: CreateRegisteredClassInput) {
    return 'This action adds a new registeredClass'
  }

  findAll() {
    return `This action returns all registeredClass`
  }

  findOne(id: number) {
    return `This action returns a #${id} registeredClass`
  }

  update(id: number, updateRegisteredClassInput: UpdateRegisteredClassInput) {
    return `This action updates a #${id} registeredClass`
  }

  remove(id: number) {
    return `This action removes a #${id} registeredClass`
  }
}
