import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformerType, UserError } from '@/common.entity.js'
import { Category } from '@/festival/category/entities/category.entity.js'
import { ClassType } from '@/festival/class-type/entities/class-type.entity.js'
import { Level } from '@/festival/level/entities/level.entity.js'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity.js'
import { Trophy } from '@/festival/trophy/entities/trophy.entity.js'

@ObjectType()
export class FestivalClass {
  @Field(() => Int)
  id: number

  classNumber: string

  classType: ClassType
  subdiscipline: Subdiscipline
  level: Level
  category: Category

  @Field(() => Int)
  maxSelections: number

  @Field(() => Int)
  minSelections: number

  requiredSelection?: string

  performerType: PerformerType

  price?: number
  description?: string
  trophies?: Trophy[]
}

@ObjectType()
export class FestivalClassPayload {
  userErrors: UserError[]
  festivalClass?: FestivalClass
}
