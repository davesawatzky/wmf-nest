import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationUpdateWithoutTbl_reg_teacherInput } from './tbl-registration-update-without-tbl-reg-teacher.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateWithoutTbl_reg_teacherInput } from './tbl-registration-create-without-tbl-reg-teacher.input';

@InputType()
export class tbl_registrationUpsertWithoutTbl_reg_teacherInput {

    @Field(() => tbl_registrationUpdateWithoutTbl_reg_teacherInput, {nullable:false})
    @Type(() => tbl_registrationUpdateWithoutTbl_reg_teacherInput)
    update!: tbl_registrationUpdateWithoutTbl_reg_teacherInput;

    @Field(() => tbl_registrationCreateWithoutTbl_reg_teacherInput, {nullable:false})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_teacherInput)
    create!: tbl_registrationCreateWithoutTbl_reg_teacherInput;
}
