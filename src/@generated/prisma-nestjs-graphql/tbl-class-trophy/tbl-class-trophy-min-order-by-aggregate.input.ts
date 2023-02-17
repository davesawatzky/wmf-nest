import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class tbl_class_trophyMinOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    classID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    trophyID?: keyof typeof SortOrder;
}
