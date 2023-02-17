import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class tbl_classlistMaxOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    classNumber?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    subdisciplineID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    categoryID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    levelID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    minSelection?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    maxSelection?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    requiredSelection?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    SGSlabel?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;
}
