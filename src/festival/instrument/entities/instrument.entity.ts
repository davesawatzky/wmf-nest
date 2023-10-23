import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import { Discipline } from '../../discipline/entities/discipline.entity'

@ObjectType()
export class Instrument {
  @Field(() => Int)
  id: number
  name: string
  mozart: boolean
  discipline: Discipline
}

@ObjectType()
export class InstrumentPayload {
  userErrors: UserError[]
  instrument?: Instrument
}
