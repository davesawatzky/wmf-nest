import { InputType, Field, Int } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime'
import { Transform, Type } from 'class-transformer'

@InputType()
export class RegisteredClassInput {
  classNumber?: string
  discipline?: string
  subdiscipline?: string
  level?: string
  category?: string

  @Field(() => Int)
  numberOfSelections?: number

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  schoolCommunityId?: number
}
