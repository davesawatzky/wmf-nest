import { InputType, Field, Int } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime/library'
import { IsInt, IsNumber } from 'class-validator'
import { Transform, Type } from 'class-transformer'

@InputType()
export class RegisteredClassInput {
  classNumber?: string
  discipline?: string
  subdiscipline?: string
  level?: string
  category?: string

  @IsInt()
  @Field(() => Int)
  numberOfSelections?: number
  @IsInt()
  @Field(() => Int)
  minSelections?: number
  @IsInt()
  @Field(() => Int)
  maxSelections?: number

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  schoolGroupID?: number
}
