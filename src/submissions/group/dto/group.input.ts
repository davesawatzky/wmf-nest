import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class GroupInput {
  name: string
  groupType?: string

  @Field(() => Int)
  numberOfPerformers?: number

  @Field(() => Int)
  age?: number
  instruments?: string
}
