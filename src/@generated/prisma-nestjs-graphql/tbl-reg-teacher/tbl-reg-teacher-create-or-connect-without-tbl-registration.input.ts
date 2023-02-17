import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_teacherWhereUniqueInput } from './tbl-reg-teacher-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_reg_teacherCreateWithoutTbl_registrationInput } from './tbl-reg-teacher-create-without-tbl-registration.input';

@InputType()
export class tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput {

    @Field(() => tbl_reg_teacherWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_teacherWhereUniqueInput)
    where!: tbl_reg_teacherWhereUniqueInput;

    @Field(() => tbl_reg_teacherCreateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_teacherCreateWithoutTbl_registrationInput)
    create!: tbl_reg_teacherCreateWithoutTbl_registrationInput;
}
