import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_subdisciplineCountAggregate } from './tbl-subdiscipline-count-aggregate.output'
import { Tbl_subdisciplineAvgAggregate } from './tbl-subdiscipline-avg-aggregate.output'
import { Tbl_subdisciplineSumAggregate } from './tbl-subdiscipline-sum-aggregate.output'
import { Tbl_subdisciplineMinAggregate } from './tbl-subdiscipline-min-aggregate.output'
import { Tbl_subdisciplineMaxAggregate } from './tbl-subdiscipline-max-aggregate.output'

@ObjectType()
export class AggregateTbl_subdiscipline {
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
