import { CreateRegistrationInput } from './create-registration.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateRegistrationInput extends PartialType(
  CreateRegistrationInput,
) {
  id: number
}
