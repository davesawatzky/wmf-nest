import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_disciplineCountOrderByAggregateInput } from './tbl-discipline-count-order-by-aggregate.input'
import { tbl_disciplineAvgOrderByAggregateInput } from './tbl-discipline-avg-order-by-aggregate.input'
import { tbl_disciplineMaxOrderByAggregateInput } from './tbl-discipline-max-order-by-aggregate.input'
import { tbl_disciplineMinOrderByAggregateInput } from './tbl-discipline-min-order-by-aggregate.input'
import { tbl_disciplineSumOrderByAggregateInput } from './tbl-discipline-sum-order-by-aggregate.input'

@InputType()
export class tbl_disciplineOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => tbl_disciplineCountOrderByAggregateInput, { nullable: true })
  _count?: tbl_disciplineCountOrderByAggregateInput

  @Field(() => tbl_disciplineAvgOrderByAggregateInput, { nullable: true })
  _avg?: tbl_disciplineAvgOrderByAggregateInput

  @Field(() => tbl_disciplineMaxOrderByAggregateInput, { nullable: true })
  _max?: tbl_disciplineMaxOrderByAggregateInput

  @Field(() => tbl_disciplineMinOrderByAggregateInput, { nullable: true })
  _min?: tbl_disciplineMinOrderByAggregateInput

  @Field(() => tbl_disciplineSumOrderByAggregateInput, { nullable: true })
  _sum?: tbl_disciplineSumOrderByAggregateInput
}
