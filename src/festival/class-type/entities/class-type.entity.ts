import { UserError } from '@/common.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ClassType {
  @Field(() => Int)
  id: number

  name: string
  description?: string
}

@ObjectType()
export class ClassTypePayload {
  userErrors: UserError[]
  classType?: ClassType
}
