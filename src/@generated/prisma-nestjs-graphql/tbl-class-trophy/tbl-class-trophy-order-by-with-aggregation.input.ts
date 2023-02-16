import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_class_trophyCountOrderByAggregateInput } from './tbl-class-trophy-count-order-by-aggregate.input'
import { tbl_class_trophyAvgOrderByAggregateInput } from './tbl-class-trophy-avg-order-by-aggregate.input'
import { tbl_class_trophyMaxOrderByAggregateInput } from './tbl-class-trophy-max-order-by-aggregate.input'
import { tbl_class_trophyMinOrderByAggregateInput } from './tbl-class-trophy-min-order-by-aggregate.input'
import { tbl_class_trophySumOrderByAggregateInput } from './tbl-class-trophy-sum-order-by-aggregate.input'

@InputType()
export class tbl_class_trophyOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  classID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  trophyID?: keyof typeof SortOrder

  @Field(() => tbl_class_trophyCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_class_trophyCountOrderByAggregateInput

  @Field(() => tbl_class_trophyAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_class_trophyAvgOrderByAggregateInput

  @Field(() => tbl_class_trophyMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_class_trophyMaxOrderByAggregateInput

  @Field(() => tbl_class_trophyMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_class_trophyMinOrderByAggregateInput

  @Field(() => tbl_class_trophySumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_class_trophySumOrderByAggregateInput
}
