import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_communityWhereInput } from '../tbl-reg-community/tbl-reg-community-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_communityOrderByWithRelationInput } from '../tbl-reg-community/tbl-reg-community-order-by-with-relation.input';
import { tbl_reg_communityWhereUniqueInput } from '../tbl-reg-community/tbl-reg-community-where-unique.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class AggregatetblRegCommunityArgs {

    @Field(() => tbl_reg_communityWhereInput, {nullable:true})
    @Type(() => tbl_reg_communityWhereInput)
    where?: tbl_reg_communityWhereInput;

    @Field(() => [tbl_reg_communityOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_reg_communityOrderByWithRelationInput>;

    @Field(() => tbl_reg_communityWhereUniqueInput, {nullable:true})
    cursor?: tbl_reg_communityWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
