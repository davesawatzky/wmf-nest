import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_userWhereInput } from '../tbl-user/tbl-user-where.input';
import { Type } from 'class-transformer';
import { tbl_userOrderByWithAggregationInput } from '../tbl-user/tbl-user-order-by-with-aggregation.input';
import { Tbl_userScalarFieldEnum } from './tbl-user-scalar-field.enum';
import { tbl_userScalarWhereWithAggregatesInput } from '../tbl-user/tbl-user-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblUserArgs {

    @Field(() => tbl_userWhereInput, {nullable:true})
    @Type(() => tbl_userWhereInput)
    where?: tbl_userWhereInput;

    @Field(() => [tbl_userOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_userOrderByWithAggregationInput>;

    @Field(() => [Tbl_userScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_userScalarFieldEnum>;

    @Field(() => tbl_userScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_userScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
