import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_registrationCountOrderByAggregateInput } from './tbl-registration-count-order-by-aggregate.input'
import { Type } from 'class-transformer'
import { tbl_registrationAvgOrderByAggregateInput } from './tbl-registration-avg-order-by-aggregate.input'
import { tbl_registrationMaxOrderByAggregateInput } from './tbl-registration-max-order-by-aggregate.input'
import { tbl_registrationMinOrderByAggregateInput } from './tbl-registration-min-order-by-aggregate.input'
import { tbl_registrationSumOrderByAggregateInput } from './tbl-registration-sum-order-by-aggregate.input'

@InputType()
export class tbl_registrationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  userID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  label?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  performerType?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  submittedAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  totalAmt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  payedAmt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  transactionInfo?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  confirmation?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => tbl_registrationCountOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_registrationCountOrderByAggregateInput)
  _count?: tbl_registrationCountOrderByAggregateInput

  @Field(() => tbl_registrationAvgOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_registrationAvgOrderByAggregateInput)
  _avg?: tbl_registrationAvgOrderByAggregateInput

  @Field(() => tbl_registrationMaxOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_registrationMaxOrderByAggregateInput)
  _max?: tbl_registrationMaxOrderByAggregateInput

  @Field(() => tbl_registrationMinOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_registrationMinOrderByAggregateInput)
  _min?: tbl_registrationMinOrderByAggregateInput

  @Field(() => tbl_registrationSumOrderByAggregateInput, { nullable: true })
  @Type(() => tbl_registrationSumOrderByAggregateInput)
  _sum?: tbl_registrationSumOrderByAggregateInput
}
