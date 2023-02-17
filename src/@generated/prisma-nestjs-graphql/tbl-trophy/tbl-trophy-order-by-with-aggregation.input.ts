import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_trophyCountOrderByAggregateInput } from './tbl-trophy-count-order-by-aggregate.input';
import { tbl_trophyAvgOrderByAggregateInput } from './tbl-trophy-avg-order-by-aggregate.input';
import { tbl_trophyMaxOrderByAggregateInput } from './tbl-trophy-max-order-by-aggregate.input';
import { tbl_trophyMinOrderByAggregateInput } from './tbl-trophy-min-order-by-aggregate.input';
import { tbl_trophySumOrderByAggregateInput } from './tbl-trophy-sum-order-by-aggregate.input';

@InputType()
export class tbl_trophyOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => tbl_trophyCountOrderByAggregateInput, {nullable:true})
    _count?: tbl_trophyCountOrderByAggregateInput;

    @Field(() => tbl_trophyAvgOrderByAggregateInput, {nullable:true})
    _avg?: tbl_trophyAvgOrderByAggregateInput;

    @Field(() => tbl_trophyMaxOrderByAggregateInput, {nullable:true})
    _max?: tbl_trophyMaxOrderByAggregateInput;

    @Field(() => tbl_trophyMinOrderByAggregateInput, {nullable:true})
    _min?: tbl_trophyMinOrderByAggregateInput;

    @Field(() => tbl_trophySumOrderByAggregateInput, {nullable:true})
    _sum?: tbl_trophySumOrderByAggregateInput;
}
