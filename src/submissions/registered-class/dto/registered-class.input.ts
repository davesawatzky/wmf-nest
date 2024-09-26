import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class RegisteredClassInput {
  @IsString()
  @IsOptional()
  classType?: string

  @IsString()
  @IsOptional()
  classNumber?: string

  @IsString()
  @IsOptional()
  discipline?: string

  @IsString()
  @IsOptional()
  subdiscipline?: string

  @IsString()
  @IsOptional()
  level?: string

  @IsString()
  @IsOptional()
  category?: string

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  numberOfSelections?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  minSelections?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  maxSelections?: number

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  schoolGroupID?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  communityGroupID?: number
}
