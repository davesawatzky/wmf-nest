import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_reg_groupCountOrderByAggregateInput } from './tbl-reg-group-count-order-by-aggregate.input';
import { tbl_reg_groupAvgOrderByAggregateInput } from './tbl-reg-group-avg-order-by-aggregate.input';
import { tbl_reg_groupMaxOrderByAggregateInput } from './tbl-reg-group-max-order-by-aggregate.input';
import { tbl_reg_groupMinOrderByAggregateInput } from './tbl-reg-group-min-order-by-aggregate.input';
import { tbl_reg_groupSumOrderByAggregateInput } from './tbl-reg-group-sum-order-by-aggregate.input';

@InputType()
export class tbl_reg_groupOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    regID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    groupType?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    numberOfPerformers?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    age?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    instruments?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => tbl_reg_groupCountOrderByAggregateInput, {nullable:true})
    _count?: tbl_reg_groupCountOrderByAggregateInput;

    @Field(() => tbl_reg_groupAvgOrderByAggregateInput, {nullable:true})
    _avg?: tbl_reg_groupAvgOrderByAggregateInput;

    @Field(() => tbl_reg_groupMaxOrderByAggregateInput, {nullable:true})
    _max?: tbl_reg_groupMaxOrderByAggregateInput;

    @Field(() => tbl_reg_groupMinOrderByAggregateInput, {nullable:true})
    _min?: tbl_reg_groupMinOrderByAggregateInput;

    @Field(() => tbl_reg_groupSumOrderByAggregateInput, {nullable:true})
    _sum?: tbl_reg_groupSumOrderByAggregateInput;
}
