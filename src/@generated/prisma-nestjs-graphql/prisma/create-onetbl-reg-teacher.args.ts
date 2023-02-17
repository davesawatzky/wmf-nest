import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_teacherCreateInput } from '../tbl-reg-teacher/tbl-reg-teacher-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblRegTeacherArgs {

    @Field(() => tbl_reg_teacherCreateInput, {nullable:false})
    @Type(() => tbl_reg_teacherCreateInput)
    data!: tbl_reg_teacherCreateInput;
}
