import { CreateFestivalClassInput } from './create-festival-class.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateFestivalClassInput extends PartialType(
  CreateFestivalClassInput,
) {
  id: number
}
