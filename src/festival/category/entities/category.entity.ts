import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'
import {IsOptional} from 'class-validator'

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number
  name?: string
  description?: string
  requiredComposer?: string
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class CategoryPayload {
  userErrors: UserError[]
  category: Category
}
