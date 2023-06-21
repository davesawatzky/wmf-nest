import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'

@ObjectType()
export class Instrument {
  @Field(() => Int)
  id: number
  name: string
}

@ObjectType()
export class InstrumentPayload {
  userErrors: UserError[]
  instrument?: Instrument
}
