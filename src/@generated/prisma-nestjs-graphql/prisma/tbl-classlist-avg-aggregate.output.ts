import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Float } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Tbl_classlistAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number

  @Field(() => Float, { nullable: true })
  subdisciplineID?: number

  @Field(() => Float, { nullable: true })
  categoryID?: number

  @Field(() => Float, { nullable: true })
  levelID?: number

  @Field(() => Float, { nullable: true })
  minSelection?: number

  @Field(() => Float, { nullable: true })
  maxSelection?: number

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal
}
