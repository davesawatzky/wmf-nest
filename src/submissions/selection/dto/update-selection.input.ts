import { CreateSelectionInput } from './create-selection.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateSelectionInput extends PartialType(CreateSelectionInput) {
  id: number
}
