import { InputType, Field, Int } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@InputType()
export class GroupInput {
  name?: string
  groupType?: string

  @IsInt()
  @Field(() => Int)
  numberOfPerformers?: number

  @IsInt()
  @Field(() => Int)
  age?: number
  instruments?: string
}
