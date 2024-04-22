import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity'

@ObjectType()
export class Selection {
  @Field(() => Int)
  id: number

  title?: string
  largerWork?: string
  movement?: string
  composer?: string
  duration?: string
}

@ObjectType()
export class SelectionPayload {
  userErrors: UserError[]
  selection: Selection
}
