import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_sacredCountOrderByAggregateInput } from './tbl-sacred-count-order-by-aggregate.input';
import { tbl_sacredAvgOrderByAggregateInput } from './tbl-sacred-avg-order-by-aggregate.input';
import { tbl_sacredMaxOrderByAggregateInput } from './tbl-sacred-max-order-by-aggregate.input';
import { tbl_sacredMinOrderByAggregateInput } from './tbl-sacred-min-order-by-aggregate.input';
import { tbl_sacredSumOrderByAggregateInput } from './tbl-sacred-sum-order-by-aggregate.input';

@InputType()
export class tbl_sacredOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    composer?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    largeWork?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    title?: keyof typeof SortOrder;

    @Field(() => tbl_sacredCountOrderByAggregateInput, {nullable:true})
    _count?: tbl_sacredCountOrderByAggregateInput;

    @Field(() => tbl_sacredAvgOrderByAggregateInput, {nullable:true})
    _avg?: tbl_sacredAvgOrderByAggregateInput;

    @Field(() => tbl_sacredMaxOrderByAggregateInput, {nullable:true})
    _max?: tbl_sacredMaxOrderByAggregateInput;

    @Field(() => tbl_sacredMinOrderByAggregateInput, {nullable:true})
    _min?: tbl_sacredMinOrderByAggregateInput;

    @Field(() => tbl_sacredSumOrderByAggregateInput, {nullable:true})
    _sum?: tbl_sacredSumOrderByAggregateInput;
}
