import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_disciplineCountAggregate } from './tbl-discipline-count-aggregate.output'
import { Tbl_disciplineAvgAggregate } from './tbl-discipline-avg-aggregate.output'
import { Tbl_disciplineSumAggregate } from './tbl-discipline-sum-aggregate.output'
import { Tbl_disciplineMinAggregate } from './tbl-discipline-min-aggregate.output'
import { Tbl_disciplineMaxAggregate } from './tbl-discipline-max-aggregate.output'

@ObjectType()
export class AggregateTbl_discipline {
  @Field(() => Tbl_disciplineCountAggregate, { nullable: true })
  _count?: Tbl_disciplineCountAggregate

  @Field(() => Tbl_disciplineAvgAggregate, { nullable: true })
  _avg?: Tbl_disciplineAvgAggregate

  @Field(() => Tbl_disciplineSumAggregate, { nullable: true })
  _sum?: Tbl_disciplineSumAggregate

  @Field(() => Tbl_disciplineMinAggregate, { nullable: true })
  _min?: Tbl_disciplineMinAggregate

  @Field(() => Tbl_disciplineMaxAggregate, { nullable: true })
  _max?: Tbl_disciplineMaxAggregate
}
