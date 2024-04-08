import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { Instrument } from '@/festival/instrument/entities/instrument.entity'
import { UserError } from '@/common.entity'

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
