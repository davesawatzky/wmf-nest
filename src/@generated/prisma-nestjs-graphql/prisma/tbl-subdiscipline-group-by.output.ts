import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_subdiscipline_SGSlabel } from './tbl-subdiscipline-sg-slabel.enum'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { Tbl_subdisciplineCountAggregate } from './tbl-subdiscipline-count-aggregate.output'
import { Tbl_subdisciplineAvgAggregate } from './tbl-subdiscipline-avg-aggregate.output'
import { Tbl_subdisciplineSumAggregate } from './tbl-subdiscipline-sum-aggregate.output'
import { Tbl_subdisciplineMinAggregate } from './tbl-subdiscipline-min-aggregate.output'
import { Tbl_subdisciplineMaxAggregate } from './tbl-subdiscipline-max-aggregate.output'

@ObjectType()
export class Tbl_subdisciplineGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  disciplineID!: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Int, { nullable: true })
  maxPerformers?: number

  @Field(() => Int, { nullable: true })
  minPerformers?: number

  @Field(() => tbl_subdiscipline_SGSlabel, { nullable: false })
  SGSlabel!: keyof typeof tbl_subdiscipline_SGSlabel

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal

  @Field(() => Tbl_subdisciplineCountAggregate, { nullable: true })
  _count?: Tbl_subdisciplineCountAggregate

  @Field(() => Tbl_subdisciplineAvgAggregate, { nullable: true })
  _avg?: Tbl_subdisciplineAvgAggregate

  @Field(() => Tbl_subdisciplineSumAggregate, { nullable: true })
  _sum?: Tbl_subdisciplineSumAggregate

  @Field(() => Tbl_subdisciplineMinAggregate, { nullable: true })
  _min?: Tbl_subdisciplineMinAggregate

  @Field(() => Tbl_subdisciplineMaxAggregate, { nullable: true })
  _max?: Tbl_subdisciplineMaxAggregate
}
