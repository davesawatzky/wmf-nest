import { Field, Int, ObjectType } from '@nestjs/graphql'

import { UserError } from '@/common.entity.js'
import { Category } from '@/festival/category/entities/category.entity.js'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity.js'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity.js'

@ObjectType()
export class Level {
  @Field(() => Int)
  id: number

  name: string
  description?: string

  @Field(() => Int)
  sortOrder?: number

  categories?: Category[]
  subdisciplines?: Subdiscipline[]
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class LevelPayload {
  userErrors: UserError[]
  level?: Level
}
