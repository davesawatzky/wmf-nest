import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { Decimal } from '@prisma/client/runtime/library'
import { Discipline } from '../../discipline/entities/discipline.entity'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'
import { Level } from 'src/festival/level/entities/level.entity'
import { SGSLabel, UserError } from 'src/common.entity'

registerEnumType(SGSLabel, {
  name: 'SGSLabel',
})

@ObjectType()
export class Subdiscipline {
  @Field(() => Int)
  id: number
  name: string
  description: string
  maxPerformers: number
  minPerformers: number

  @Field(() => SGSLabel)
  SGSLabel: SGSLabel

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  levels?: Level[]
  discipline?: Discipline
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class SubdisciplinePayload {
  userErrors: UserError[]
  subdiscpline?: Subdiscipline
}
