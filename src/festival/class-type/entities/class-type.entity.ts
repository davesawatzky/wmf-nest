import {Field, ObjectType, Int} from '@nestjs/graphql'
import { UserError } from 'src/common.entity'

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
