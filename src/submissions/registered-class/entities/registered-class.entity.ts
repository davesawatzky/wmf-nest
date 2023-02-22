import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { UserError } from 'src/common.entity'
import { Selection } from '../../selection/entities/selection.entity'

@ObjectType()
export class RegisteredClass {
  @Field(() => Int)
  id: number
  selections?: Selection[]
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

@ObjectType()
export class RegisteredClassPayload {
  userErrors: UserError[]
  registeredClass?: RegisteredClass
}
