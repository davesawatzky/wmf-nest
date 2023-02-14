import { CreateTeacherInput } from './create-teacher.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateTeacherInput extends PartialType(CreateTeacherInput) {
  id: number
}
