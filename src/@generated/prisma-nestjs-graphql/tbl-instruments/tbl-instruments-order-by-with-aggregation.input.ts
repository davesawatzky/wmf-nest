import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_instrumentsCountOrderByAggregateInput } from './tbl-instruments-count-order-by-aggregate.input'
import { tbl_instrumentsAvgOrderByAggregateInput } from './tbl-instruments-avg-order-by-aggregate.input'
import { tbl_instrumentsMaxOrderByAggregateInput } from './tbl-instruments-max-order-by-aggregate.input'
import { tbl_instrumentsMinOrderByAggregateInput } from './tbl-instruments-min-order-by-aggregate.input'
import { tbl_instrumentsSumOrderByAggregateInput } from './tbl-instruments-sum-order-by-aggregate.input'

@InputType()
export class tbl_instrumentsOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => tbl_instrumentsCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_instrumentsCountOrderByAggregateInput

  @Field(() => tbl_instrumentsAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_instrumentsAvgOrderByAggregateInput

  @Field(() => tbl_instrumentsMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_instrumentsMaxOrderByAggregateInput

  @Field(() => tbl_instrumentsMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_instrumentsMinOrderByAggregateInput

  @Field(() => tbl_instrumentsSumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_instrumentsSumOrderByAggregateInput
}
