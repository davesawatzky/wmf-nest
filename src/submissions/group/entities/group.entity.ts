import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'

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
