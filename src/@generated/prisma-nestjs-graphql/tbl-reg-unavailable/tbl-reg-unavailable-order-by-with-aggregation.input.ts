import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_reg_unavailableCountOrderByAggregateInput } from './tbl-reg-unavailable-count-order-by-aggregate.input';
import { tbl_reg_unavailableAvgOrderByAggregateInput } from './tbl-reg-unavailable-avg-order-by-aggregate.input';
import { tbl_reg_unavailableMaxOrderByAggregateInput } from './tbl-reg-unavailable-max-order-by-aggregate.input';
import { tbl_reg_unavailableMinOrderByAggregateInput } from './tbl-reg-unavailable-min-order-by-aggregate.input';
import { tbl_reg_unavailableSumOrderByAggregateInput } from './tbl-reg-unavailable-sum-order-by-aggregate.input';

@InputType()
export class tbl_reg_unavailableOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    groupID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    time?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => tbl_reg_unavailableCountOrderByAggregateInput, {nullable:true})
    _count?: tbl_reg_unavailableCountOrderByAggregateInput;

    @Field(() => tbl_reg_unavailableAvgOrderByAggregateInput, {nullable:true})
    _avg?: tbl_reg_unavailableAvgOrderByAggregateInput;

    @Field(() => tbl_reg_unavailableMaxOrderByAggregateInput, {nullable:true})
    _max?: tbl_reg_unavailableMaxOrderByAggregateInput;

    @Field(() => tbl_reg_unavailableMinOrderByAggregateInput, {nullable:true})
    _min?: tbl_reg_unavailableMinOrderByAggregateInput;

    @Field(() => tbl_reg_unavailableSumOrderByAggregateInput, {nullable:true})
    _sum?: tbl_reg_unavailableSumOrderByAggregateInput;
}
