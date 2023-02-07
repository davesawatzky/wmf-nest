import { Injectable } from '@nestjs/common'
import { CreateInstrumentInput } from './dto/create-instrument.input'
import { UpdateInstrumentInput } from './dto/update-instrument.input'

@Injectable()
export class InstrumentService {
  create(createInstrumentInput: CreateInstrumentInput) {
    return 'This action adds a new instrument'
  }

  findAll() {
    return `This action returns all instrument`
  }

  findOne(id: number) {
    return `This action returns a #${id} instrument`
  }

  update(id: number, updateInstrumentInput: UpdateInstrumentInput) {
    return `This action updates a #${id} instrument`
  }

  remove(id: number) {
    return `This action removes a #${id} instrument`
  }
}
