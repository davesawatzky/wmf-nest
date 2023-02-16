import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Tbl_subdisciplineSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: true })
  disciplineID?: number

  @Field(() => Int, { nullable: true })
  maxPerformers?: number

  @Field(() => Int, { nullable: true })
  minPerformers?: number

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal
}
