import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_SGS } from './tbl-sgs.enum'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { Tbl_classlistCountAggregate } from './tbl-classlist-count-aggregate.output'
import { Tbl_classlistAvgAggregate } from './tbl-classlist-avg-aggregate.output'
import { Tbl_classlistSumAggregate } from './tbl-classlist-sum-aggregate.output'
import { Tbl_classlistMinAggregate } from './tbl-classlist-min-aggregate.output'
import { Tbl_classlistMaxAggregate } from './tbl-classlist-max-aggregate.output'

@ObjectType()
export class Tbl_classlistGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false })
  classNumber!: string

  @Field(() => Int, { nullable: false })
  subdisciplineID!: number

  @Field(() => Int, { nullable: false })
  categoryID!: number

  @Field(() => Int, { nullable: false })
  levelID!: number

  @Field(() => Int, { nullable: false })
  minSelection!: number

  @Field(() => Int, { nullable: false })
  maxSelection!: number

  @Field(() => String, { nullable: true })
  requiredSelection?: string

  @Field(() => tbl_SGS, { nullable: false })
  SGSlabel!: keyof typeof tbl_SGS

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal

  @Field(() => Tbl_classlistCountAggregate, { nullable: true })
  _count?: Tbl_classlistCountAggregate

  @Field(() => Tbl_classlistAvgAggregate, { nullable: true })
  _avg?: Tbl_classlistAvgAggregate

  @Field(() => Tbl_classlistSumAggregate, { nullable: true })
  _sum?: Tbl_classlistSumAggregate

  @Field(() => Tbl_classlistMinAggregate, { nullable: true })
  _min?: Tbl_classlistMinAggregate

  @Field(() => Tbl_classlistMaxAggregate, { nullable: true })
  _max?: Tbl_classlistMaxAggregate
}
