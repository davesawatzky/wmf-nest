import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_teacherUpdateWithoutTbl_registrationInput } from './tbl-reg-teacher-update-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_reg_teacherCreateWithoutTbl_registrationInput } from './tbl-reg-teacher-create-without-tbl-registration.input';

@InputType()
export class tbl_reg_teacherUpsertWithoutTbl_registrationInput {

    @Field(() => tbl_reg_teacherUpdateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_teacherUpdateWithoutTbl_registrationInput)
    update!: tbl_reg_teacherUpdateWithoutTbl_registrationInput;

    @Field(() => tbl_reg_teacherCreateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_teacherCreateWithoutTbl_registrationInput)
    create!: tbl_reg_teacherCreateWithoutTbl_registrationInput;
}
