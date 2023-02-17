import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_teacherCreateWithoutTbl_registrationInput } from './tbl-reg-teacher-create-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-teacher-create-or-connect-without-tbl-registration.input';
import { tbl_reg_teacherWhereUniqueInput } from './tbl-reg-teacher-where-unique.input';

@InputType()
export class tbl_reg_teacherCreateNestedOneWithoutTbl_registrationInput {

    @Field(() => tbl_reg_teacherCreateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_teacherCreateWithoutTbl_registrationInput)
    create?: tbl_reg_teacherCreateWithoutTbl_registrationInput;

    @Field(() => tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput)
    connectOrCreate?: tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput;

    @Field(() => tbl_reg_teacherWhereUniqueInput, {nullable:true})
    @Type(() => tbl_reg_teacherWhereUniqueInput)
    connect?: tbl_reg_teacherWhereUniqueInput;
}
