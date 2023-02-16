import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_reg_teacherCountOrderByAggregateInput } from './tbl-reg-teacher-count-order-by-aggregate.input'
import { tbl_reg_teacherAvgOrderByAggregateInput } from './tbl-reg-teacher-avg-order-by-aggregate.input'
import { tbl_reg_teacherMaxOrderByAggregateInput } from './tbl-reg-teacher-max-order-by-aggregate.input'
import { tbl_reg_teacherMinOrderByAggregateInput } from './tbl-reg-teacher-min-order-by-aggregate.input'
import { tbl_reg_teacherSumOrderByAggregateInput } from './tbl-reg-teacher-sum-order-by-aggregate.input'

@InputType()
export class tbl_reg_teacherOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  regID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  prefix?: keyof typeof SortOrder

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
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => tbl_reg_teacherCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_reg_teacherCountOrderByAggregateInput

  @Field(() => tbl_reg_teacherAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_reg_teacherAvgOrderByAggregateInput

  @Field(() => tbl_reg_teacherMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_reg_teacherMaxOrderByAggregateInput

  @Field(() => tbl_reg_teacherMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_reg_teacherMinOrderByAggregateInput

  @Field(() => tbl_reg_teacherSumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_reg_teacherSumOrderByAggregateInput
}
