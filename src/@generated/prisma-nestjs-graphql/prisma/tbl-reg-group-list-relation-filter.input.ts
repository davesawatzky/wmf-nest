import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_groupWhereInput } from '../tbl-reg-group/tbl-reg-group-where.input';

@InputType()
export class Tbl_reg_groupListRelationFilter {

    @Field(() => tbl_reg_groupWhereInput, {nullable:true})
    every?: tbl_reg_groupWhereInput;

    @Field(() => tbl_reg_groupWhereInput, {nullable:true})
    some?: tbl_reg_groupWhereInput;

    @Field(() => tbl_reg_groupWhereInput, {nullable:true})
    none?: tbl_reg_groupWhereInput;
}
