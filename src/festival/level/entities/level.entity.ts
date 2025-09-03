import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity'
import { Category } from '@/festival/category/entities/category.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'

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
