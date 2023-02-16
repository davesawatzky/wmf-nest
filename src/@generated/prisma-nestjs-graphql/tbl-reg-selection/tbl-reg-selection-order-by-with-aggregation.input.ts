import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_reg_selectionCountOrderByAggregateInput } from './tbl-reg-selection-count-order-by-aggregate.input'
import { tbl_reg_selectionAvgOrderByAggregateInput } from './tbl-reg-selection-avg-order-by-aggregate.input'
import { tbl_reg_selectionMaxOrderByAggregateInput } from './tbl-reg-selection-max-order-by-aggregate.input'
import { tbl_reg_selectionMinOrderByAggregateInput } from './tbl-reg-selection-min-order-by-aggregate.input'
import { tbl_reg_selectionSumOrderByAggregateInput } from './tbl-reg-selection-sum-order-by-aggregate.input'

@InputType()
export class tbl_reg_selectionOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  classpickID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  largerWork?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  movement?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  composer?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  duration?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => tbl_reg_selectionCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_reg_selectionCountOrderByAggregateInput

  @Field(() => tbl_reg_selectionAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_reg_selectionAvgOrderByAggregateInput

  @Field(() => tbl_reg_selectionMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_reg_selectionMaxOrderByAggregateInput

  @Field(() => tbl_reg_selectionMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_reg_selectionMinOrderByAggregateInput

  @Field(() => tbl_reg_selectionSumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_reg_selectionSumOrderByAggregateInput
}
