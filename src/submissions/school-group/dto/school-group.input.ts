import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsString } from 'class-validator'

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

  @IsBoolean()
  photoPermission?: boolean
}
