import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_categoryCountOrderByAggregateInput } from './tbl-category-count-order-by-aggregate.input'
import { tbl_categoryAvgOrderByAggregateInput } from './tbl-category-avg-order-by-aggregate.input'
import { tbl_categoryMaxOrderByAggregateInput } from './tbl-category-max-order-by-aggregate.input'
import { tbl_categoryMinOrderByAggregateInput } from './tbl-category-min-order-by-aggregate.input'
import { tbl_categorySumOrderByAggregateInput } from './tbl-category-sum-order-by-aggregate.input'

@InputType()
export class tbl_categoryOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  requiredComposer?: keyof typeof SortOrder

  @Field(() => tbl_categoryCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_categoryCountOrderByAggregateInput

  @Field(() => tbl_categoryAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_categoryAvgOrderByAggregateInput

  @Field(() => tbl_categoryMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_categoryMaxOrderByAggregateInput

  @Field(() => tbl_categoryMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_categoryMinOrderByAggregateInput

  @Field(() => tbl_categorySumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_categorySumOrderByAggregateInput
}
