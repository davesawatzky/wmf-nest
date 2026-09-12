import { Field, Int, ObjectType } from '@nestjs/graphql'

import { UserError } from '@/common.entity.js'
import { Discipline } from '@/festival/discipline/entities/discipline.entity.js'

@ObjectType()
export class Instrument {
  @Field(() => Int)
  id: number

  name: string
  mozart?: boolean
  discipline?: Discipline
}

@ObjectType()
export class InstrumentPayload {
  userErrors: UserError[]
  instrument?: Instrument
}
