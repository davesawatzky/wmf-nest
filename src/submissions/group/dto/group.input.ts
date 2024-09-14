import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class GroupInput {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  groupType?: string

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  numberOfPerformers?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  age?: number

  @IsString()
  @IsOptional()
  instruments?: string
}
