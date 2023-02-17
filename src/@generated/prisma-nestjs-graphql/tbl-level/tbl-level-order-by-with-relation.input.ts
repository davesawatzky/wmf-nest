import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_classlistOrderByRelationAggregateInput } from '../tbl-classlist/tbl-classlist-order-by-relation-aggregate.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_levelOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    order?: keyof typeof SortOrder;

    @Field(() => tbl_classlistOrderByRelationAggregateInput, {nullable:true})
    @Type(() => tbl_classlistOrderByRelationAggregateInput)
    tbl_classlist?: tbl_classlistOrderByRelationAggregateInput;
}
