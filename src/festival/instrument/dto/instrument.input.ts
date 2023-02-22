import { InputType } from '@nestjs/graphql'

@InputType()
export class InstrumentInput {
  name?: string
}
