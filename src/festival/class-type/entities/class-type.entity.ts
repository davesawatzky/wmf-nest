import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class ClassType {
  @Field(() => Int)
  id: number
  name: string
  description?: string
}
