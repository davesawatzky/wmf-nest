import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'
import {Level} from 'src/festival/level/entities/level.entity'
import {Subdiscipline} from 'src/festival/subdiscipline/entities/subdiscipline.entity'

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
