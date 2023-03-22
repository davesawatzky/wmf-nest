import { InputType, Field, Int } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime/library'
import { IsInt, IsNumber } from 'class-validator'
import { Transform, Type } from 'class-transformer'

@InputType()
export class RegisteredClassInput {
  class_number?: string
  discipline?: string
  subdiscipline?: string
  level?: string
  category?: string

  @IsInt()
  @Field(() => Int)
  number_of_selections?: number

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  school_communityId?: number
}
