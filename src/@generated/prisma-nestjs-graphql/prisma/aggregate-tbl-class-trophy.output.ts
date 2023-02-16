import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_class_trophyCountAggregate } from './tbl-class-trophy-count-aggregate.output'
import { Tbl_class_trophyAvgAggregate } from './tbl-class-trophy-avg-aggregate.output'
import { Tbl_class_trophySumAggregate } from './tbl-class-trophy-sum-aggregate.output'
import { Tbl_class_trophyMinAggregate } from './tbl-class-trophy-min-aggregate.output'
import { Tbl_class_trophyMaxAggregate } from './tbl-class-trophy-max-aggregate.output'

@ObjectType()
export class AggregateTbl_class_trophy {
  @Field(() => Tbl_class_trophyCountAggregate, { nullable: true })
  _count?: Tbl_class_trophyCountAggregate

  @Field(() => Tbl_class_trophyAvgAggregate, { nullable: true })
  _avg?: Tbl_class_trophyAvgAggregate

  @Field(() => Tbl_class_trophySumAggregate, { nullable: true })
  _sum?: Tbl_class_trophySumAggregate

  @Field(() => Tbl_class_trophyMinAggregate, { nullable: true })
  _min?: Tbl_class_trophyMinAggregate

  @Field(() => Tbl_class_trophyMaxAggregate, { nullable: true })
  _max?: Tbl_class_trophyMaxAggregate
}
