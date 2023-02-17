import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_teacherUpdateInput } from '../tbl-reg-teacher/tbl-reg-teacher-update.input';
import { Type } from 'class-transformer';
import { tbl_reg_teacherWhereUniqueInput } from '../tbl-reg-teacher/tbl-reg-teacher-where-unique.input';

@ArgsType()
export class UpdateOnetblRegTeacherArgs {

    @Field(() => tbl_reg_teacherUpdateInput, {nullable:false})
    @Type(() => tbl_reg_teacherUpdateInput)
    data!: tbl_reg_teacherUpdateInput;

    @Field(() => tbl_reg_teacherWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_teacherWhereUniqueInput)
    where!: tbl_reg_teacherWhereUniqueInput;
}
