import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'

@ObjectType()
export class Trophy {
  @Field(() => Int)
  id: number

  name: string
  description?: string
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class TrophyPayload {
  userErrors: UserError[]
  trophy?: Trophy
}
