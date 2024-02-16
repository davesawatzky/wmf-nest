import { InputType, Field, Int } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime/library'
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'

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

  @IsNumber()
  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  schoolGroupID?: number
}
