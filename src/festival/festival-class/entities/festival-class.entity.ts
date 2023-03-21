import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { SGS_label, UserError } from 'src/common.entity'
import { Subdiscipline } from '../../subdiscipline/entities/subdiscipline.entity'
import { Level } from '../../level/entities/level.entity'
import { Category } from '../../category/entities/category.entity'
import { Trophy } from '../../trophy/entities/trophy.entity'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'

registerEnumType(SGS_label, {
  name: 'SGS_label',
  description: 'SOLO, GROUP, SCHOOL, COMMUNITY',
})

@ObjectType()
export class FestivalClass {
  @Field(() => Int)
  id: number
  class_number: string
  subdiscipline: Subdiscipline
  level: Level
  category: Category

  @Field(() => Int)
  max_selection: number

  @Field(() => Int)
  min_selection: number
  required_selection?: string

  @Field(() => SGS_label)
  SGS_label: SGS_label

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  trophies?: Trophy[]
}

@ObjectType()
export class FestivalClassPayload {
  userErrors: UserError[]
  festivalClass?: FestivalClass
}
