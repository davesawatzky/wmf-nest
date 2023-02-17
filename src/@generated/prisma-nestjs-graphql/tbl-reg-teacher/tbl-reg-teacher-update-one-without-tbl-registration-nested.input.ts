import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_teacherCreateWithoutTbl_registrationInput } from './tbl-reg-teacher-create-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-teacher-create-or-connect-without-tbl-registration.input';
import { tbl_reg_teacherUpsertWithoutTbl_registrationInput } from './tbl-reg-teacher-upsert-without-tbl-registration.input';
import { tbl_reg_teacherWhereUniqueInput } from './tbl-reg-teacher-where-unique.input';
import { tbl_reg_teacherUpdateWithoutTbl_registrationInput } from './tbl-reg-teacher-update-without-tbl-registration.input';

@InputType()
export class tbl_reg_teacherUpdateOneWithoutTbl_registrationNestedInput {

    @Field(() => tbl_reg_teacherCreateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_teacherCreateWithoutTbl_registrationInput)
    create?: tbl_reg_teacherCreateWithoutTbl_registrationInput;

    @Field(() => tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput)
    connectOrCreate?: tbl_reg_teacherCreateOrConnectWithoutTbl_registrationInput;

    @Field(() => tbl_reg_teacherUpsertWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_teacherUpsertWithoutTbl_registrationInput)
    upsert?: tbl_reg_teacherUpsertWithoutTbl_registrationInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => Boolean, {nullable:true})
    delete?: boolean;

    @Field(() => tbl_reg_teacherWhereUniqueInput, {nullable:true})
    @Type(() => tbl_reg_teacherWhereUniqueInput)
    connect?: tbl_reg_teacherWhereUniqueInput;

    @Field(() => tbl_reg_teacherUpdateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_teacherUpdateWithoutTbl_registrationInput)
    update?: tbl_reg_teacherUpdateWithoutTbl_registrationInput;
}
