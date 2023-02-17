import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_teacherWhereInput } from '../tbl-reg-teacher/tbl-reg-teacher-where.input';

@InputType()
export class Tbl_reg_teacherRelationFilter {

    @Field(() => tbl_reg_teacherWhereInput, {nullable:true})
    is?: tbl_reg_teacherWhereInput;

    @Field(() => tbl_reg_teacherWhereInput, {nullable:true})
    isNot?: tbl_reg_teacherWhereInput;
}
