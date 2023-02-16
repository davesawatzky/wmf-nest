import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Tbl_reg_performerCountAggregate } from './tbl-reg-performer-count-aggregate.output'
import { Tbl_reg_performerAvgAggregate } from './tbl-reg-performer-avg-aggregate.output'
import { Tbl_reg_performerSumAggregate } from './tbl-reg-performer-sum-aggregate.output'
import { Tbl_reg_performerMinAggregate } from './tbl-reg-performer-min-aggregate.output'
import { Tbl_reg_performerMaxAggregate } from './tbl-reg-performer-max-aggregate.output'

@ObjectType()
export class Tbl_reg_performerGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  regID!: number

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

  @Field(() => Int, { nullable: true })
  age?: number

  @Field(() => String, { nullable: true })
  instrument?: string

  @Field(() => String, { nullable: true })
  level?: string

  @Field(() => String, { nullable: true })
  otherClasses?: string

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string

  @Field(() => Date, { nullable: false })
  updatedAt!: Date | string

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
