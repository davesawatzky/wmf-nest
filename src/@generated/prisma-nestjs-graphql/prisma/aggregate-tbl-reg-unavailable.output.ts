import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_reg_unavailableCountAggregate } from './tbl-reg-unavailable-count-aggregate.output'
import { Tbl_reg_unavailableAvgAggregate } from './tbl-reg-unavailable-avg-aggregate.output'
import { Tbl_reg_unavailableSumAggregate } from './tbl-reg-unavailable-sum-aggregate.output'
import { Tbl_reg_unavailableMinAggregate } from './tbl-reg-unavailable-min-aggregate.output'
import { Tbl_reg_unavailableMaxAggregate } from './tbl-reg-unavailable-max-aggregate.output'

@ObjectType()
export class AggregateTbl_reg_unavailable {
  @Field(() => Tbl_reg_unavailableCountAggregate, { nullable: true })
  _count?: Tbl_reg_unavailableCountAggregate

  @Field(() => Tbl_reg_unavailableAvgAggregate, { nullable: true })
  _avg?: Tbl_reg_unavailableAvgAggregate

  @Field(() => Tbl_reg_unavailableSumAggregate, { nullable: true })
  _sum?: Tbl_reg_unavailableSumAggregate

  @Field(() => Tbl_reg_unavailableMinAggregate, { nullable: true })
  _min?: Tbl_reg_unavailableMinAggregate

  @Field(() => Tbl_reg_unavailableMaxAggregate, { nullable: true })
  _max?: Tbl_reg_unavailableMaxAggregate
}
