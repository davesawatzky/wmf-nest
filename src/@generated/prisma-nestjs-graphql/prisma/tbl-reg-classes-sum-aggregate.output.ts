import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Tbl_reg_classesSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: true })
  regID?: number

  @Field(() => Int, { nullable: true })
  numberOfSelections?: number

  @Field(() => Int, { nullable: true })
  schoolCommunityId?: number

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal
}
