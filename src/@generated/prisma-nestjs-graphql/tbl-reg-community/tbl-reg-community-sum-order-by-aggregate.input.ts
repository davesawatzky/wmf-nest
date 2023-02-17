import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class tbl_reg_communitySumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    regID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    groupSize?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    chaperones?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    wheelchairs?: keyof typeof SortOrder;
}
