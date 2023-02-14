import { CreateRegisteredClassInput } from './create-registered-class.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateRegisteredClassInput extends PartialType(
  CreateRegisteredClassInput,
) {
  id: number
}
