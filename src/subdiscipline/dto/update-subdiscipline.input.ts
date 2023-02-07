import { CreateSubdisciplineInput } from './create-subdiscipline.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateSubdisciplineInput extends PartialType(
  CreateSubdisciplineInput,
) {
  id: number
}
