import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_userCountAggregate } from './tbl-user-count-aggregate.output'
import { Tbl_userAvgAggregate } from './tbl-user-avg-aggregate.output'
import { Tbl_userSumAggregate } from './tbl-user-sum-aggregate.output'
import { Tbl_userMinAggregate } from './tbl-user-min-aggregate.output'
import { Tbl_userMaxAggregate } from './tbl-user-max-aggregate.output'

@ObjectType()
export class AggregateTbl_user {
  @Field(() => Tbl_userCountAggregate, { nullable: true })
  _count?: Tbl_userCountAggregate

  @Field(() => Tbl_userAvgAggregate, { nullable: true })
  _avg?: Tbl_userAvgAggregate

  @Field(() => Tbl_userSumAggregate, { nullable: true })
  _sum?: Tbl_userSumAggregate

  @Field(() => Tbl_userMinAggregate, { nullable: true })
  _min?: Tbl_userMinAggregate

  @Field(() => Tbl_userMaxAggregate, { nullable: true })
  _max?: Tbl_userMaxAggregate
}
