import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_selectionWhereInput } from '../tbl-reg-selection/tbl-reg-selection-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_selectionOrderByWithAggregationInput } from '../tbl-reg-selection/tbl-reg-selection-order-by-with-aggregation.input';
import { Tbl_reg_selectionScalarFieldEnum } from './tbl-reg-selection-scalar-field.enum';
import { tbl_reg_selectionScalarWhereWithAggregatesInput } from '../tbl-reg-selection/tbl-reg-selection-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblRegSelectionArgs {

    @Field(() => tbl_reg_selectionWhereInput, {nullable:true})
    @Type(() => tbl_reg_selectionWhereInput)
    where?: tbl_reg_selectionWhereInput;

    @Field(() => [tbl_reg_selectionOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_reg_selectionOrderByWithAggregationInput>;

    @Field(() => [Tbl_reg_selectionScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_reg_selectionScalarFieldEnum>;

    @Field(() => tbl_reg_selectionScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_reg_selectionScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
