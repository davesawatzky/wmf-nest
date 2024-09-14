import { UserError } from '@/common.entity'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

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
