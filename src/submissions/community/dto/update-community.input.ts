import { CreateCommunityInput } from './create-community.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateCommunityInput extends PartialType(CreateCommunityInput) {
  id: number
}
