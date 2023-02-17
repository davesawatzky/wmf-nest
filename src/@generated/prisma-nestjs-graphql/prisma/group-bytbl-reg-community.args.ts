import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_communityWhereInput } from '../tbl-reg-community/tbl-reg-community-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_communityOrderByWithAggregationInput } from '../tbl-reg-community/tbl-reg-community-order-by-with-aggregation.input';
import { Tbl_reg_communityScalarFieldEnum } from './tbl-reg-community-scalar-field.enum';
import { tbl_reg_communityScalarWhereWithAggregatesInput } from '../tbl-reg-community/tbl-reg-community-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblRegCommunityArgs {

    @Field(() => tbl_reg_communityWhereInput, {nullable:true})
    @Type(() => tbl_reg_communityWhereInput)
    where?: tbl_reg_communityWhereInput;

    @Field(() => [tbl_reg_communityOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_reg_communityOrderByWithAggregationInput>;

    @Field(() => [Tbl_reg_communityScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_reg_communityScalarFieldEnum>;

    @Field(() => tbl_reg_communityScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_reg_communityScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
