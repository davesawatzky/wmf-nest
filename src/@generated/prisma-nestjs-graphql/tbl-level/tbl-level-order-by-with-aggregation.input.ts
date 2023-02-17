import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_levelCountOrderByAggregateInput } from './tbl-level-count-order-by-aggregate.input';
import { tbl_levelAvgOrderByAggregateInput } from './tbl-level-avg-order-by-aggregate.input';
import { tbl_levelMaxOrderByAggregateInput } from './tbl-level-max-order-by-aggregate.input';
import { tbl_levelMinOrderByAggregateInput } from './tbl-level-min-order-by-aggregate.input';
import { tbl_levelSumOrderByAggregateInput } from './tbl-level-sum-order-by-aggregate.input';

@InputType()
export class tbl_levelOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => tbl_levelCountOrderByAggregateInput, {nullable:true})
    _count?: tbl_levelCountOrderByAggregateInput;

    @Field(() => tbl_levelAvgOrderByAggregateInput, {nullable:true})
    _avg?: tbl_levelAvgOrderByAggregateInput;

    @Field(() => tbl_levelMaxOrderByAggregateInput, {nullable:true})
    _max?: tbl_levelMaxOrderByAggregateInput;

    @Field(() => tbl_levelMinOrderByAggregateInput, {nullable:true})
    _min?: tbl_levelMinOrderByAggregateInput;

    @Field(() => tbl_levelSumOrderByAggregateInput, {nullable:true})
    _sum?: tbl_levelSumOrderByAggregateInput;
}
