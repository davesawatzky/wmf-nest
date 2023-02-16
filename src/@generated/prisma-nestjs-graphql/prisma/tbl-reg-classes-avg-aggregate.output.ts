import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Float } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Tbl_reg_classesAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number

  @Field(() => Float, { nullable: true })
  regID?: number

  @Field(() => Float, { nullable: true })
  numberOfSelections?: number

  @Field(() => Float, { nullable: true })
  schoolCommunityId?: number

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal
}
