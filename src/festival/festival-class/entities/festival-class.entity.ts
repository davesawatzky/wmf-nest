import { PerformerType, UserError } from '@/common.entity'
import { Category } from '@/festival/category/entities/category.entity'
import { ClassType } from '@/festival/class-type/entities/class-type.entity'
import { Level } from '@/festival/level/entities/level.entity'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { Trophy } from '@/festival/trophy/entities/trophy.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

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

  @Field(type => Int)
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
