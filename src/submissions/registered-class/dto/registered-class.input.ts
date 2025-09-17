import { Field, InputType, Int } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { IsDecimal, IsInt, IsOptional, IsString } from 'class-validator'
import {
  GraphQLDecimal,
  transformToDecimal,
} from 'prisma-graphql-type-decimal'

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

  @Field(() => GraphQLDecimal)
  @IsDecimal({ decimal_digits: '2' })
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  schoolGroupID?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  communityGroupID?: number
}
