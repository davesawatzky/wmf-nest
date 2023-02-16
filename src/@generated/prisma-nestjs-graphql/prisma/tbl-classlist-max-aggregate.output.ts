import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_SGS } from './tbl-sgs.enum'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class Tbl_classlistMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: true })
  classNumber?: string

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

  @Field(() => String, { nullable: true })
  requiredSelection?: string

  @Field(() => tbl_SGS, { nullable: true })
  SGSlabel?: keyof typeof tbl_SGS

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal
}
