import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateWithoutTbl_reg_teacherInput } from './tbl-registration-create-without-tbl-reg-teacher.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateOrConnectWithoutTbl_reg_teacherInput } from './tbl-registration-create-or-connect-without-tbl-reg-teacher.input';
import { tbl_registrationUpsertWithoutTbl_reg_teacherInput } from './tbl-registration-upsert-without-tbl-reg-teacher.input';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';
import { tbl_registrationUpdateWithoutTbl_reg_teacherInput } from './tbl-registration-update-without-tbl-reg-teacher.input';

@InputType()
export class tbl_registrationUpdateOneRequiredWithoutTbl_reg_teacherNestedInput {

    @Field(() => tbl_registrationCreateWithoutTbl_reg_teacherInput, {nullable:true})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_teacherInput)
    create?: tbl_registrationCreateWithoutTbl_reg_teacherInput;

    @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_teacherInput, {nullable:true})
    @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_teacherInput)
    connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_teacherInput;

    @Field(() => tbl_registrationUpsertWithoutTbl_reg_teacherInput, {nullable:true})
    @Type(() => tbl_registrationUpsertWithoutTbl_reg_teacherInput)
    upsert?: tbl_registrationUpsertWithoutTbl_reg_teacherInput;

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:true})
    @Type(() => tbl_registrationWhereUniqueInput)
    connect?: tbl_registrationWhereUniqueInput;

    @Field(() => tbl_registrationUpdateWithoutTbl_reg_teacherInput, {nullable:true})
    @Type(() => tbl_registrationUpdateWithoutTbl_reg_teacherInput)
    update?: tbl_registrationUpdateWithoutTbl_reg_teacherInput;
}
