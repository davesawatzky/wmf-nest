import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_reg_communityCountOrderByAggregateInput } from './tbl-reg-community-count-order-by-aggregate.input';
import { tbl_reg_communityAvgOrderByAggregateInput } from './tbl-reg-community-avg-order-by-aggregate.input';
import { tbl_reg_communityMaxOrderByAggregateInput } from './tbl-reg-community-max-order-by-aggregate.input';
import { tbl_reg_communityMinOrderByAggregateInput } from './tbl-reg-community-min-order-by-aggregate.input';
import { tbl_reg_communitySumOrderByAggregateInput } from './tbl-reg-community-sum-order-by-aggregate.input';

@InputType()
export class tbl_reg_communityOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    regID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    groupSize?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    chaperones?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    wheelchairs?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    earliestTime?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    latestTime?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    unavailable?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    conflictPerformers?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => tbl_reg_communityCountOrderByAggregateInput, {nullable:true})
    _count?: tbl_reg_communityCountOrderByAggregateInput;

    @Field(() => tbl_reg_communityAvgOrderByAggregateInput, {nullable:true})
    _avg?: tbl_reg_communityAvgOrderByAggregateInput;

    @Field(() => tbl_reg_communityMaxOrderByAggregateInput, {nullable:true})
    _max?: tbl_reg_communityMaxOrderByAggregateInput;

    @Field(() => tbl_reg_communityMinOrderByAggregateInput, {nullable:true})
    _min?: tbl_reg_communityMinOrderByAggregateInput;

    @Field(() => tbl_reg_communitySumOrderByAggregateInput, {nullable:true})
    _sum?: tbl_reg_communitySumOrderByAggregateInput;
}
