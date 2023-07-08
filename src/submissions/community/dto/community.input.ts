import { InputType, Field, Int } from '@nestjs/graphql'
import { IsInt } from 'class-validator'

@InputType()
export class CommunityInput {
  name?: string
  conflictPerformers?: string

  @IsInt()
  @Field(() => Int)
  groupSize?: number

  @IsInt()
  @Field(() => Int)
  chaperones?: number

  @IsInt()
  @Field(() => Int)
  wheelchairs?: number
  earliestTime?: string
  latestTime?: string
  unavailable?: string
}
