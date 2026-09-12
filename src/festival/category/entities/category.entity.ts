import { Field, Int, ObjectType } from '@nestjs/graphql'

import { UserError } from '@/common.entity.js'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity.js'
import { Level } from '@/festival/level/entities/level.entity.js'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity.js'

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number

  name: string
  description?: string
  requiredComposer?: string
  levels?: Level[]
  subdisciplines?: Subdiscipline[]
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class CategoryPayload {
  userErrors: UserError[]
  category?: Category
}
