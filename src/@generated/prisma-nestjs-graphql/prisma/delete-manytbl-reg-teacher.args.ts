import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_teacherWhereInput } from '../tbl-reg-teacher/tbl-reg-teacher-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblRegTeacherArgs {

    @Field(() => tbl_reg_teacherWhereInput, {nullable:true})
    @Type(() => tbl_reg_teacherWhereInput)
    where?: tbl_reg_teacherWhereInput;
}
