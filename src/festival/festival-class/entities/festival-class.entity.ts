import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { PerformerType, UserError } from 'src/common.entity'
import { Subdiscipline } from '../../subdiscipline/entities/subdiscipline.entity'
import { Level } from '../../level/entities/level.entity'
import { Category } from '../../category/entities/category.entity'
import { Trophy } from '../../trophy/entities/trophy.entity'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'

registerEnumType(PerformerType, {
  name: 'PerformerType',
  description: 'SOLO, GROUP, SCHOOL, COMMUNITY',
})

@ObjectType()
export class FestivalClass {
  @Field(() => Int)
  id: number
  classNumber: string
  subdiscipline: Subdiscipline
  level: Level
  category: Category

  @Field(() => Int)
  maxSelections: number

  @Field(() => Int)
  minSelections: number
  requiredSelection?: string

  @Field(() => PerformerType)
  performerType: PerformerType

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
