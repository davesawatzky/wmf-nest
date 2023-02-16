import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Tbl_reg_teacherCountAggregate } from './tbl-reg-teacher-count-aggregate.output'
import { Tbl_reg_teacherAvgAggregate } from './tbl-reg-teacher-avg-aggregate.output'
import { Tbl_reg_teacherSumAggregate } from './tbl-reg-teacher-sum-aggregate.output'
import { Tbl_reg_teacherMinAggregate } from './tbl-reg-teacher-min-aggregate.output'
import { Tbl_reg_teacherMaxAggregate } from './tbl-reg-teacher-max-aggregate.output'

@ObjectType()
export class Tbl_reg_teacherGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => String, { nullable: true })
  prefix?: string

  @Field(() => String, { nullable: true })
  lastName?: string

  @Field(() => String, { nullable: true })
  firstName?: string

  @Field(() => String, { nullable: true })
  apartment?: string

  @Field(() => String, { nullable: true })
  streetNumber?: string

  @Field(() => String, { nullable: true })
  streetName?: string

  @Field(() => String, { nullable: false })
  city!: string

  @Field(() => String, { nullable: false })
  province!: string

  @Field(() => String, { nullable: true })
  postalCode?: string

  @Field(() => String, { nullable: true })
  phone?: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string

  @Field(() => Date, { nullable: false })
  updatedAt!: Date | string

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
