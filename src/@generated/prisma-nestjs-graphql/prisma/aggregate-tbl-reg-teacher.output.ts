import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Tbl_reg_teacherCountAggregate } from './tbl-reg-teacher-count-aggregate.output'
import { Tbl_reg_teacherAvgAggregate } from './tbl-reg-teacher-avg-aggregate.output'
import { Tbl_reg_teacherSumAggregate } from './tbl-reg-teacher-sum-aggregate.output'
import { Tbl_reg_teacherMinAggregate } from './tbl-reg-teacher-min-aggregate.output'
import { Tbl_reg_teacherMaxAggregate } from './tbl-reg-teacher-max-aggregate.output'

@ObjectType()
export class AggregateTbl_reg_teacher {
  @Field(() => Tbl_reg_teacherCountAggregate, { nullable: true })
  _count?: Tbl_reg_teacherCountAggregate

  @Field(() => Tbl_reg_teacherAvgAggregate, { nullable: true })
  _avg?: Tbl_reg_teacherAvgAggregate

  @Field(() => Tbl_reg_teacherSumAggregate, { nullable: true })
  _sum?: Tbl_reg_teacherSumAggregate

  @Field(() => Tbl_reg_teacherMinAggregate, { nullable: true })
  _min?: Tbl_reg_teacherMinAggregate

  @Field(() => Tbl_reg_teacherMaxAggregate, { nullable: true })
  _max?: Tbl_reg_teacherMaxAggregate
}
