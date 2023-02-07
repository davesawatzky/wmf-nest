import { CreatePerformerInput } from './create-performer.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdatePerformerInput extends PartialType(CreatePerformerInput) {
  id: number
}
