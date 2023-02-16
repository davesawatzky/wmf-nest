import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_registrationCountAggregate } from './tbl-registration-count-aggregate.output'
import { Tbl_registrationAvgAggregate } from './tbl-registration-avg-aggregate.output'
import { Tbl_registrationSumAggregate } from './tbl-registration-sum-aggregate.output'
import { Tbl_registrationMinAggregate } from './tbl-registration-min-aggregate.output'
import { Tbl_registrationMaxAggregate } from './tbl-registration-max-aggregate.output'

@ObjectType()
export class AggregateTbl_registration {
  @Field(() => Tbl_registrationCountAggregate, { nullable: true })
  _count?: Tbl_registrationCountAggregate

  @Field(() => Tbl_registrationAvgAggregate, { nullable: true })
  _avg?: Tbl_registrationAvgAggregate

  @Field(() => Tbl_registrationSumAggregate, { nullable: true })
  _sum?: Tbl_registrationSumAggregate

  @Field(() => Tbl_registrationMinAggregate, { nullable: true })
  _min?: Tbl_registrationMinAggregate

  @Field(() => Tbl_registrationMaxAggregate, { nullable: true })
  _max?: Tbl_registrationMaxAggregate
}
