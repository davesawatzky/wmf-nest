import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Tbl_levelCountAggregate } from './tbl-level-count-aggregate.output'
import { Tbl_levelAvgAggregate } from './tbl-level-avg-aggregate.output'
import { Tbl_levelSumAggregate } from './tbl-level-sum-aggregate.output'
import { Tbl_levelMinAggregate } from './tbl-level-min-aggregate.output'
import { Tbl_levelMaxAggregate } from './tbl-level-max-aggregate.output'

@ObjectType()
export class Tbl_levelGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Int, { nullable: true })
  order?: number

  @Field(() => Tbl_levelCountAggregate, { nullable: true })
  _count?: Tbl_levelCountAggregate

  @Field(() => Tbl_levelAvgAggregate, { nullable: true })
  _avg?: Tbl_levelAvgAggregate

  @Field(() => Tbl_levelSumAggregate, { nullable: true })
  _sum?: Tbl_levelSumAggregate

  @Field(() => Tbl_levelMinAggregate, { nullable: true })
  _min?: Tbl_levelMinAggregate

  @Field(() => Tbl_levelMaxAggregate, { nullable: true })
  _max?: Tbl_levelMaxAggregate
}
