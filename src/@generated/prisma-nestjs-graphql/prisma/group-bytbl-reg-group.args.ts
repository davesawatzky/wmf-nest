import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_groupWhereInput } from '../tbl-reg-group/tbl-reg-group-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_groupOrderByWithAggregationInput } from '../tbl-reg-group/tbl-reg-group-order-by-with-aggregation.input';
import { Tbl_reg_groupScalarFieldEnum } from './tbl-reg-group-scalar-field.enum';
import { tbl_reg_groupScalarWhereWithAggregatesInput } from '../tbl-reg-group/tbl-reg-group-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblRegGroupArgs {

    @Field(() => tbl_reg_groupWhereInput, {nullable:true})
    @Type(() => tbl_reg_groupWhereInput)
    where?: tbl_reg_groupWhereInput;

    @Field(() => [tbl_reg_groupOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_reg_groupOrderByWithAggregationInput>;

    @Field(() => [Tbl_reg_groupScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_reg_groupScalarFieldEnum>;

    @Field(() => tbl_reg_groupScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_reg_groupScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
