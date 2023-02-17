import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_performerWhereInput } from '../tbl-reg-performer/tbl-reg-performer-where.input';

@InputType()
export class Tbl_reg_performerListRelationFilter {

    @Field(() => tbl_reg_performerWhereInput, {nullable:true})
    every?: tbl_reg_performerWhereInput;

    @Field(() => tbl_reg_performerWhereInput, {nullable:true})
    some?: tbl_reg_performerWhereInput;

    @Field(() => tbl_reg_performerWhereInput, {nullable:true})
    none?: tbl_reg_performerWhereInput;
}
