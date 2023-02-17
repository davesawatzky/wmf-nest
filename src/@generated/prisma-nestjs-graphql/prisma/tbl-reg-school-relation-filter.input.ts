import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_schoolWhereInput } from '../tbl-reg-school/tbl-reg-school-where.input';

@InputType()
export class Tbl_reg_schoolRelationFilter {

    @Field(() => tbl_reg_schoolWhereInput, {nullable:true})
    is?: tbl_reg_schoolWhereInput;

    @Field(() => tbl_reg_schoolWhereInput, {nullable:true})
    isNot?: tbl_reg_schoolWhereInput;
}
