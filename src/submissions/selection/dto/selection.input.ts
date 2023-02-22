import { InputType } from '@nestjs/graphql'

@InputType()
export class SelectionInput {
  title?: string
  largerWork?: string
  movement?: string
  composer?: string
  duration?: string
}
