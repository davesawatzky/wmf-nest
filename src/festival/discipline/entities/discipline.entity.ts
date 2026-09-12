import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity.js'
import { Instrument } from '@/festival/instrument/entities/instrument.entity.js'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity.js'

@ObjectType()
export class Discipline {
  @Field(() => Int)
  id: number

  name: string
  instruments?: Instrument[]
  subdisciplines?: Subdiscipline[]
}

@ObjectType()
export class DisciplinePayload {
  userErrors: UserError[]
  discipline?: Discipline
}
