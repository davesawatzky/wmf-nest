import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { SGSlabel, UserError } from 'src/common.entity'
import { Subdiscipline } from '../../subdiscipline/entities/subdiscipline.entity'
import { Level } from '../../level/entities/level.entity'
import { Category } from '../../category/entities/category.entity'
import { Trophy } from '../../trophy/entities/trophy.entity'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'

registerEnumType(SGSlabel, {
  name: 'SGSlabel',
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
  maxSelection: number

  @Field(() => Int)
  minSelection: number
  requiredSelection?: string

  @Field(() => SGSlabel)
  SGSlabel: SGSlabel

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
