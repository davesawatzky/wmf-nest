import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_reg_schoolCountOrderByAggregateInput } from './tbl-reg-school-count-order-by-aggregate.input'
import { tbl_reg_schoolAvgOrderByAggregateInput } from './tbl-reg-school-avg-order-by-aggregate.input'
import { tbl_reg_schoolMaxOrderByAggregateInput } from './tbl-reg-school-max-order-by-aggregate.input'
import { tbl_reg_schoolMinOrderByAggregateInput } from './tbl-reg-school-min-order-by-aggregate.input'
import { tbl_reg_schoolSumOrderByAggregateInput } from './tbl-reg-school-sum-order-by-aggregate.input'

@InputType()
export class tbl_reg_schoolOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  regID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  division?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  streetNumber?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  streetName?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  city?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  province?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  postalCode?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  phone?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => tbl_reg_schoolCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_reg_schoolCountOrderByAggregateInput

  @Field(() => tbl_reg_schoolAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_reg_schoolAvgOrderByAggregateInput

  @Field(() => tbl_reg_schoolMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_reg_schoolMaxOrderByAggregateInput

  @Field(() => tbl_reg_schoolMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_reg_schoolMinOrderByAggregateInput

  @Field(() => tbl_reg_schoolSumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_reg_schoolSumOrderByAggregateInput
}
