import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_subdisciplineCountOrderByAggregateInput } from './tbl-subdiscipline-count-order-by-aggregate.input';
import { Type } from 'class-transformer';
import { tbl_subdisciplineAvgOrderByAggregateInput } from './tbl-subdiscipline-avg-order-by-aggregate.input';
import { tbl_subdisciplineMaxOrderByAggregateInput } from './tbl-subdiscipline-max-order-by-aggregate.input';
import { tbl_subdisciplineMinOrderByAggregateInput } from './tbl-subdiscipline-min-order-by-aggregate.input';
import { tbl_subdisciplineSumOrderByAggregateInput } from './tbl-subdiscipline-sum-order-by-aggregate.input';

@InputType()
export class tbl_subdisciplineOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    disciplineID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    maxPerformers?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    minPerformers?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    SGSlabel?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => tbl_subdisciplineCountOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_subdisciplineCountOrderByAggregateInput)
    _count?: tbl_subdisciplineCountOrderByAggregateInput;

    @Field(() => tbl_subdisciplineAvgOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_subdisciplineAvgOrderByAggregateInput)
    _avg?: tbl_subdisciplineAvgOrderByAggregateInput;

    @Field(() => tbl_subdisciplineMaxOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_subdisciplineMaxOrderByAggregateInput)
    _max?: tbl_subdisciplineMaxOrderByAggregateInput;

    @Field(() => tbl_subdisciplineMinOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_subdisciplineMinOrderByAggregateInput)
    _min?: tbl_subdisciplineMinOrderByAggregateInput;

    @Field(() => tbl_subdisciplineSumOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_subdisciplineSumOrderByAggregateInput)
    _sum?: tbl_subdisciplineSumOrderByAggregateInput;
}
