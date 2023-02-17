import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_reg_classesCountOrderByAggregateInput } from './tbl-reg-classes-count-order-by-aggregate.input';
import { Type } from 'class-transformer';
import { tbl_reg_classesAvgOrderByAggregateInput } from './tbl-reg-classes-avg-order-by-aggregate.input';
import { tbl_reg_classesMaxOrderByAggregateInput } from './tbl-reg-classes-max-order-by-aggregate.input';
import { tbl_reg_classesMinOrderByAggregateInput } from './tbl-reg-classes-min-order-by-aggregate.input';
import { tbl_reg_classesSumOrderByAggregateInput } from './tbl-reg-classes-sum-order-by-aggregate.input';

@InputType()
export class tbl_reg_classesOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    regID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    classNumber?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discipline?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    subdiscipline?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    level?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    category?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    numberOfSelections?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    schoolCommunityId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => tbl_reg_classesCountOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_reg_classesCountOrderByAggregateInput)
    _count?: tbl_reg_classesCountOrderByAggregateInput;

    @Field(() => tbl_reg_classesAvgOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_reg_classesAvgOrderByAggregateInput)
    _avg?: tbl_reg_classesAvgOrderByAggregateInput;

    @Field(() => tbl_reg_classesMaxOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_reg_classesMaxOrderByAggregateInput)
    _max?: tbl_reg_classesMaxOrderByAggregateInput;

    @Field(() => tbl_reg_classesMinOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_reg_classesMinOrderByAggregateInput)
    _min?: tbl_reg_classesMinOrderByAggregateInput;

    @Field(() => tbl_reg_classesSumOrderByAggregateInput, {nullable:true})
    @Type(() => tbl_reg_classesSumOrderByAggregateInput)
    _sum?: tbl_reg_classesSumOrderByAggregateInput;
}
