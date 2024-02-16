import { InputType, Field, Int } from '@nestjs/graphql'
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class CommunityInput {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  conflictPerformers?: string

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  groupSize?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  chaperones?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  wheelchairs?: number

  @IsString()
  @IsOptional()
  earliestTime?: string

  @IsString()
  @IsOptional()
  latestTime?: string

  @IsString()
  @IsOptional()
  unavailable?: string
}
