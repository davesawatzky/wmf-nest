import { Field, Int, ObjectType } from '@nestjs/graphql'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'
import { UserError } from '../../../common.entity'

@ObjectType()
export class Level {
  @Field(() => Int)
  id: number
  name: string
  description?: string
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class LevelPayload {
  userErrors: UserError[]
  level?: Level
}
