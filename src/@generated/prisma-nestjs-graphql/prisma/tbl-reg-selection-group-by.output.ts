import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Tbl_reg_selectionCountAggregate } from './tbl-reg-selection-count-aggregate.output'
import { Tbl_reg_selectionAvgAggregate } from './tbl-reg-selection-avg-aggregate.output'
import { Tbl_reg_selectionSumAggregate } from './tbl-reg-selection-sum-aggregate.output'
import { Tbl_reg_selectionMinAggregate } from './tbl-reg-selection-min-aggregate.output'
import { Tbl_reg_selectionMaxAggregate } from './tbl-reg-selection-max-aggregate.output'

@ObjectType()
export class Tbl_reg_selectionGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  classpickID!: number

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  largerWork?: string

  @Field(() => String, { nullable: true })
  movement?: string

  @Field(() => String, { nullable: true })
  composer?: string

  @Field(() => String, { nullable: false })
  duration!: string

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string

  @Field(() => Date, { nullable: false })
  updatedAt!: Date | string

  @Field(() => Tbl_reg_selectionCountAggregate, { nullable: true })
  _count?: Tbl_reg_selectionCountAggregate

  @Field(() => Tbl_reg_selectionAvgAggregate, { nullable: true })
  _avg?: Tbl_reg_selectionAvgAggregate

  @Field(() => Tbl_reg_selectionSumAggregate, { nullable: true })
  _sum?: Tbl_reg_selectionSumAggregate

  @Field(() => Tbl_reg_selectionMinAggregate, { nullable: true })
  _min?: Tbl_reg_selectionMinAggregate

  @Field(() => Tbl_reg_selectionMaxAggregate, { nullable: true })
  _max?: Tbl_reg_selectionMaxAggregate
}
