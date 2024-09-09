import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsInt, IsString } from 'class-validator'

@InputType()
export class CommunityGroupInput {
  @IsString()
  name?: string

  @IsString()
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

  @IsString()
  earliestTime?: string

  @IsString()
  latestTime?: string

  @IsString()
  unavailable?: string
}
