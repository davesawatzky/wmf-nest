import { UserError } from '@/common.entity'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { Selection } from '@/submissions/selection/entities/selection.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class RegisteredClass {
  @Field(() => Int)
  id: number

  regID: number

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

  performers?: Performer[]
}

@ObjectType()
export class RegisteredClassPayload {
  userErrors: UserError[]
  registeredClass?: RegisteredClass
}
