import { CreateInstrumentInput } from './create-instrument.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateInstrumentInput extends PartialType(CreateInstrumentInput) {
  id: number
}
