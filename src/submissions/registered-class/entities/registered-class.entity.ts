import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { UserError } from '@/common.entity'
import { Selection } from '@/submissions/selection/entities/selection.entity'

@ObjectType()
export class RegisteredClass {
  @Field(() => Int)
  id: number

  selections?: Selection[]
  classType?: string
  classNumber?: string
  discipline?: string
  subdiscipline?: string
  level?: string
  category?: string

  @Field(() => Int)
  numberOfSelections?: number

  @Field(() => Int)
  minSelections?: number

  @Field(() => Int)
  maxSelections?: number

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @Field(() => Int)
  schoolGroupID?: number

  @Field(() => Int)
  communityGroupID?: number
}

@ObjectType()
export class RegisteredClassPayload {
  userErrors: UserError[]
  registeredClass: RegisteredClass
}
