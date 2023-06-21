import { Field, ObjectType, Int } from '@nestjs/graphql'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'
import { UserError } from '../../../common.entity'

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
