import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_classlistCountOrderByAggregateInput } from './tbl-classlist-count-order-by-aggregate.input'
import { Type } from 'class-transformer'
import { tbl_classlistAvgOrderByAggregateInput } from './tbl-classlist-avg-order-by-aggregate.input'
import { tbl_classlistMaxOrderByAggregateInput } from './tbl-classlist-max-order-by-aggregate.input'
import { tbl_classlistMinOrderByAggregateInput } from './tbl-classlist-min-order-by-aggregate.input'
import { tbl_classlistSumOrderByAggregateInput } from './tbl-classlist-sum-order-by-aggregate.input'

@InputType()
export class tbl_classlistOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  classNumber?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  subdisciplineID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  categoryID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  levelID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  minSelection?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  maxSelection?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  requiredSelection?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  SGSlabel?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  price?: keyof typeof SortOrder

  @Field(() => tbl_classlistCountOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_classlistCountOrderByAggregateInput)
  _count?: tbl_classlistCountOrderByAggregateInput

  @Field(() => tbl_classlistAvgOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_classlistAvgOrderByAggregateInput)
  _avg?: tbl_classlistAvgOrderByAggregateInput

  @Field(() => tbl_classlistMaxOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_classlistMaxOrderByAggregateInput)
  _max?: tbl_classlistMaxOrderByAggregateInput

  @Field(() => tbl_classlistMinOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_classlistMinOrderByAggregateInput)
  _min?: tbl_classlistMinOrderByAggregateInput

  @Field(() => tbl_classlistSumOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_classlistSumOrderByAggregateInput)
  _sum?: tbl_classlistSumOrderByAggregateInput
}
