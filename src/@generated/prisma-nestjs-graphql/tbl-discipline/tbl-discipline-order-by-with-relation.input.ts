import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_subdisciplineOrderByRelationAggregateInput } from '../tbl-subdiscipline/tbl-subdiscipline-order-by-relation-aggregate.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_disciplineOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => tbl_subdisciplineOrderByRelationAggregateInput, {nullable:true})
    @Type(() => tbl_subdisciplineOrderByRelationAggregateInput)
    tbl_subdiscipline?: tbl_subdisciplineOrderByRelationAggregateInput;
}
