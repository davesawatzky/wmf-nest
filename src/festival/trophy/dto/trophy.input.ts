import { InputType } from '@nestjs/graphql'

@InputType()
export class TrophyInput {
  name: string
  description?: string
}
