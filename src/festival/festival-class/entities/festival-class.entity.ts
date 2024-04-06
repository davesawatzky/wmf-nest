import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { PerformerType, UserError } from '../../../common.entity'
import { Subdiscipline } from '../../subdiscipline/entities/subdiscipline.entity'
import { Level } from '../../level/entities/level.entity'
import { Category } from '../../category/entities/category.entity'
import { Trophy } from '../../trophy/entities/trophy.entity'
import { ClassType } from '../../class-type/entities/class-type.entity'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import {Type, Transform} from 'class-transformer'
import { tbl_performer_type } from '@prisma/client'

registerEnumType(PerformerType, {
  name: 'PerformerType',
})

@ObjectType()
export class FestivalClass {
  @Field(type => Int)
  id: number
  classType?: ClassType
  classNumber: string
  subdiscipline?: Subdiscipline
  level?: Level
  category?: Category

  @Field(type => Int)
  maxSelections: number

  @Field(type => Int)
  minSelections: number
  requiredSelection?: string
  performerType: PerformerType | tbl_performer_type

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  description?: string
  trophies?: Trophy[]
}

@ObjectType()
export class FestivalClassPayload {
  userErrors: UserError[]
  festivalClass?: FestivalClass
}
