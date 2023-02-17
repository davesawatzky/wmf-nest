import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_categoryWhereInput } from '../tbl-category/tbl-category-where.input';
import { Type } from 'class-transformer';
import { tbl_categoryOrderByWithAggregationInput } from '../tbl-category/tbl-category-order-by-with-aggregation.input';
import { Tbl_categoryScalarFieldEnum } from './tbl-category-scalar-field.enum';
import { tbl_categoryScalarWhereWithAggregatesInput } from '../tbl-category/tbl-category-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblCategoryArgs {

    @Field(() => tbl_categoryWhereInput, {nullable:true})
    @Type(() => tbl_categoryWhereInput)
    where?: tbl_categoryWhereInput;

    @Field(() => [tbl_categoryOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_categoryOrderByWithAggregationInput>;

    @Field(() => [Tbl_categoryScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_categoryScalarFieldEnum>;

    @Field(() => tbl_categoryScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_categoryScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
