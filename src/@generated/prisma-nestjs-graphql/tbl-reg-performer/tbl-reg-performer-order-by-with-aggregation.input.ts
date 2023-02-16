import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_reg_performerCountOrderByAggregateInput } from './tbl-reg-performer-count-order-by-aggregate.input'
import { tbl_reg_performerAvgOrderByAggregateInput } from './tbl-reg-performer-avg-order-by-aggregate.input'
import { tbl_reg_performerMaxOrderByAggregateInput } from './tbl-reg-performer-max-order-by-aggregate.input'
import { tbl_reg_performerMinOrderByAggregateInput } from './tbl-reg-performer-min-order-by-aggregate.input'
import { tbl_reg_performerSumOrderByAggregateInput } from './tbl-reg-performer-sum-order-by-aggregate.input'

@InputType()
export class tbl_reg_performerOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  regID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  lastName?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  firstName?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  apartment?: keyof typeof SortOrder

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
  email?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  age?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  instrument?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  level?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  otherClasses?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => tbl_reg_performerCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_reg_performerCountOrderByAggregateInput

  @Field(() => tbl_reg_performerAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_reg_performerAvgOrderByAggregateInput

  @Field(() => tbl_reg_performerMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_reg_performerMaxOrderByAggregateInput

  @Field(() => tbl_reg_performerMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_reg_performerMinOrderByAggregateInput

  @Field(() => tbl_reg_performerSumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_reg_performerSumOrderByAggregateInput
}
