import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'

@ObjectType()
export class Group {
  @Field(() => Int)
  id: number
  name?: string
  groupType?: string

  @Field(() => Int)
  numberOfPerformers?: number

  @Field(() => Int)
  age?: number
  instruments?: string
}

@ObjectType()
export class GroupPayload {
  userErrors: UserError[]
  group?: Group
}
