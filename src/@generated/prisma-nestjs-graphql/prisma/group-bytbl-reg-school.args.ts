import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_schoolWhereInput } from '../tbl-reg-school/tbl-reg-school-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_schoolOrderByWithAggregationInput } from '../tbl-reg-school/tbl-reg-school-order-by-with-aggregation.input';
import { Tbl_reg_schoolScalarFieldEnum } from './tbl-reg-school-scalar-field.enum';
import { tbl_reg_schoolScalarWhereWithAggregatesInput } from '../tbl-reg-school/tbl-reg-school-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblRegSchoolArgs {

    @Field(() => tbl_reg_schoolWhereInput, {nullable:true})
    @Type(() => tbl_reg_schoolWhereInput)
    where?: tbl_reg_schoolWhereInput;

    @Field(() => [tbl_reg_schoolOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_reg_schoolOrderByWithAggregationInput>;

    @Field(() => [Tbl_reg_schoolScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_reg_schoolScalarFieldEnum>;

    @Field(() => tbl_reg_schoolScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_reg_schoolScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
