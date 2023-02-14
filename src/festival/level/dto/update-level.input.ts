import { CreateLevelInput } from './create-level.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateLevelInput extends PartialType(CreateLevelInput) {
  id: number
}
