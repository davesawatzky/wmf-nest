import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Tbl_classlistSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: true })
  subdisciplineID?: number

  @Field(() => Int, { nullable: true })
  categoryID?: number

  @Field(() => Int, { nullable: true })
  levelID?: number

  @Field(() => Int, { nullable: true })
  minSelection?: number

  @Field(() => Int, { nullable: true })
  maxSelection?: number

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal
}
