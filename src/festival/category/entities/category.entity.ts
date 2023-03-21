import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number
  name: string
  description?: string
  require_composer?: string
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class CategoryPayload {
  userErrors: UserError[]
  category?: Category
}
