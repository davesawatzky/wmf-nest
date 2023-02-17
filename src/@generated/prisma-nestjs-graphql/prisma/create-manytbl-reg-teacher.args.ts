import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_teacherCreateManyInput } from '../tbl-reg-teacher/tbl-reg-teacher-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblRegTeacherArgs {

    @Field(() => [tbl_reg_teacherCreateManyInput], {nullable:false})
    @Type(() => tbl_reg_teacherCreateManyInput)
    data!: Array<tbl_reg_teacherCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
