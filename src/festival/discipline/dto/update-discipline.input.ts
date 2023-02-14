import { CreateDisciplineInput } from './create-discipline.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateDisciplineInput extends PartialType(CreateDisciplineInput) {
  id: number
}
