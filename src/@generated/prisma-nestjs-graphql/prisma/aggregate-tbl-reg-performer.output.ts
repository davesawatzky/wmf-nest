import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_reg_performerCountAggregate } from './tbl-reg-performer-count-aggregate.output'
import { Tbl_reg_performerAvgAggregate } from './tbl-reg-performer-avg-aggregate.output'
import { Tbl_reg_performerSumAggregate } from './tbl-reg-performer-sum-aggregate.output'
import { Tbl_reg_performerMinAggregate } from './tbl-reg-performer-min-aggregate.output'
import { Tbl_reg_performerMaxAggregate } from './tbl-reg-performer-max-aggregate.output'

@ObjectType()
export class AggregateTbl_reg_performer {
  @Field(() => Tbl_reg_performerCountAggregate, { nullable: true })
  _count?: Tbl_reg_performerCountAggregate

  @Field(() => Tbl_reg_performerAvgAggregate, { nullable: true })
  _avg?: Tbl_reg_performerAvgAggregate

  @Field(() => Tbl_reg_performerSumAggregate, { nullable: true })
  _sum?: Tbl_reg_performerSumAggregate

  @Field(() => Tbl_reg_performerMinAggregate, { nullable: true })
  _min?: Tbl_reg_performerMinAggregate

  @Field(() => Tbl_reg_performerMaxAggregate, { nullable: true })
  _max?: Tbl_reg_performerMaxAggregate
}
