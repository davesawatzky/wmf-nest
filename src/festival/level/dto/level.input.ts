import { InputType } from '@nestjs/graphql'

@InputType()
export class LevelInput {
  name: string
  description?: string
}
