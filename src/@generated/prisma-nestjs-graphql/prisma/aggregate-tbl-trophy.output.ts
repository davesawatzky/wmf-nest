import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_trophyCountAggregate } from './tbl-trophy-count-aggregate.output'
import { Tbl_trophyAvgAggregate } from './tbl-trophy-avg-aggregate.output'
import { Tbl_trophySumAggregate } from './tbl-trophy-sum-aggregate.output'
import { Tbl_trophyMinAggregate } from './tbl-trophy-min-aggregate.output'
import { Tbl_trophyMaxAggregate } from './tbl-trophy-max-aggregate.output'

@ObjectType()
export class AggregateTbl_trophy {
  @Field(() => Tbl_trophyCountAggregate, { nullable: true })
  _count?: Tbl_trophyCountAggregate

  @Field(() => Tbl_trophyAvgAggregate, { nullable: true })
  _avg?: Tbl_trophyAvgAggregate

  @Field(() => Tbl_trophySumAggregate, { nullable: true })
  _sum?: Tbl_trophySumAggregate

  @Field(() => Tbl_trophyMinAggregate, { nullable: true })
  _min?: Tbl_trophyMinAggregate

  @Field(() => Tbl_trophyMaxAggregate, { nullable: true })
  _max?: Tbl_trophyMaxAggregate
}
