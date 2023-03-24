import { InputType, Field, Int } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@InputType()
export class SchoolGroupInput {
  name: string
  conflict_performers?: string

  @IsInt()
  @Field(() => Int)
  group_size?: number

  @IsInt()
  @Field(() => Int)
  chaperones?: number

  @IsInt()
  @Field(() => Int)
  wheelchairs?: number
  earliest_time?: string
  latest_time?: string
  unavailable?: string
}
