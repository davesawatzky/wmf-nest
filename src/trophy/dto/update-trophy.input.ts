import { CreateTrophyInput } from './create-trophy.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateTrophyInput extends PartialType(CreateTrophyInput) {
  id: number
}
