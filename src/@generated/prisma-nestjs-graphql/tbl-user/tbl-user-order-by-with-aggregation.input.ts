import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_userCountOrderByAggregateInput } from './tbl-user-count-order-by-aggregate.input'
import { tbl_userAvgOrderByAggregateInput } from './tbl-user-avg-order-by-aggregate.input'
import { tbl_userMaxOrderByAggregateInput } from './tbl-user-max-order-by-aggregate.input'
import { tbl_userMinOrderByAggregateInput } from './tbl-user-min-order-by-aggregate.input'
import { tbl_userSumOrderByAggregateInput } from './tbl-user-sum-order-by-aggregate.input'

@InputType()
export class tbl_userOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  email?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  password?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  staff?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  admin?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  firstName?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  lastName?: keyof typeof SortOrder

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
  updatedAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => tbl_userCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_userCountOrderByAggregateInput

  @Field(() => tbl_userAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_userAvgOrderByAggregateInput

  @Field(() => tbl_userMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_userMaxOrderByAggregateInput

  @Field(() => tbl_userMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_userMinOrderByAggregateInput

  @Field(() => tbl_userSumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_userSumOrderByAggregateInput
}
