import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class tbl_reg_communityMaxOrderByAggregateInput {

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
}
