import { InputType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class SchoolGroupInput {
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
