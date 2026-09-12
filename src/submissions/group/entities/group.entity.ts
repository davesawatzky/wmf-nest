import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity.js'
import { Registration } from '@/submissions/registration/entities/registration.entity.js'

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
  registration?: Registration
}

@ObjectType()
export class GroupPayload {
  userErrors: UserError[]
  group?: Group
}
