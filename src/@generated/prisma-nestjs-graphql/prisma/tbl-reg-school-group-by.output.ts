import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Tbl_reg_schoolCountAggregate } from './tbl-reg-school-count-aggregate.output'
import { Tbl_reg_schoolAvgAggregate } from './tbl-reg-school-avg-aggregate.output'
import { Tbl_reg_schoolSumAggregate } from './tbl-reg-school-sum-aggregate.output'
import { Tbl_reg_schoolMinAggregate } from './tbl-reg-school-min-aggregate.output'
import { Tbl_reg_schoolMaxAggregate } from './tbl-reg-school-max-aggregate.output'

@ObjectType()
export class Tbl_reg_schoolGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  division?: string

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

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string

  @Field(() => Date, { nullable: false })
  updatedAt!: Date | string

  @Field(() => Tbl_reg_schoolCountAggregate, { nullable: true })
  _count?: Tbl_reg_schoolCountAggregate

  @Field(() => Tbl_reg_schoolAvgAggregate, { nullable: true })
  _avg?: Tbl_reg_schoolAvgAggregate

  @Field(() => Tbl_reg_schoolSumAggregate, { nullable: true })
  _sum?: Tbl_reg_schoolSumAggregate

  @Field(() => Tbl_reg_schoolMinAggregate, { nullable: true })
  _min?: Tbl_reg_schoolMinAggregate

  @Field(() => Tbl_reg_schoolMaxAggregate, { nullable: true })
  _max?: Tbl_reg_schoolMaxAggregate
}
