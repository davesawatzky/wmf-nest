import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { Decimal } from '@prisma/client/runtime/library'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
import { Category } from '@/festival/category/entities/category.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { Level } from '@/festival/level/entities/level.entity'
import { PerformerType, UserError } from '@/common.entity'

@ObjectType()
export class Subdiscipline {
  @Field(() => Int)
  id: number

  name: string
  description?: string

  @Field(() => Int)
  maxPerformers?: number

  @Field(() => Int)
  minPerformers?: number

  performerType?: PerformerType

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  categories?: Category[]
  levels?: Level[]
  discipline?: Discipline
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class SubdisciplinePayload {
  userErrors: UserError[]
  subdiscipline?: Subdiscipline
}
