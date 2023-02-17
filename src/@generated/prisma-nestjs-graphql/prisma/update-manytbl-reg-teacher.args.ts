import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_teacherUpdateManyMutationInput } from '../tbl-reg-teacher/tbl-reg-teacher-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_reg_teacherWhereInput } from '../tbl-reg-teacher/tbl-reg-teacher-where.input';

@ArgsType()
export class UpdateManytblRegTeacherArgs {

    @Field(() => tbl_reg_teacherUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_reg_teacherUpdateManyMutationInput)
    data!: tbl_reg_teacherUpdateManyMutationInput;

    @Field(() => tbl_reg_teacherWhereInput, {nullable:true})
    @Type(() => tbl_reg_teacherWhereInput)
    where?: tbl_reg_teacherWhereInput;
}
