import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { Decimal } from '@prisma/client/runtime/library'
import { Discipline } from '../../discipline/entities/discipline.entity'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'
import { SGS_label, UserError } from 'src/common.entity'

registerEnumType(SGS_label, {
  name: 'SGS_label',
})

@ObjectType()
export class Subdiscipline {
  @Field(() => Int)
  id: number
  name: string
  description: string
  maxPerformers: number
  minPerformers: number

  @Field(() => SGS_label)
  SGS_label: SGS_label

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  discipline?: Discipline
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class SubdisciplinePayload {
  userErrors: UserError[]
  subdiscpline?: Subdiscipline
}
