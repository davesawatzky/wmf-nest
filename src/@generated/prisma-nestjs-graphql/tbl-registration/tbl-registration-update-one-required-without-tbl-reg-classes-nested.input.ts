import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateWithoutTbl_reg_classesInput } from './tbl-registration-create-without-tbl-reg-classes.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput } from './tbl-registration-create-or-connect-without-tbl-reg-classes.input';
import { tbl_registrationUpsertWithoutTbl_reg_classesInput } from './tbl-registration-upsert-without-tbl-reg-classes.input';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';
import { tbl_registrationUpdateWithoutTbl_reg_classesInput } from './tbl-registration-update-without-tbl-reg-classes.input';

@InputType()
export class tbl_registrationUpdateOneRequiredWithoutTbl_reg_classesNestedInput {

    @Field(() => tbl_registrationCreateWithoutTbl_reg_classesInput, {nullable:true})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_classesInput)
    create?: tbl_registrationCreateWithoutTbl_reg_classesInput;

    @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput, {nullable:true})
    @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput)
    connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput;

    @Field(() => tbl_registrationUpsertWithoutTbl_reg_classesInput, {nullable:true})
    @Type(() => tbl_registrationUpsertWithoutTbl_reg_classesInput)
    upsert?: tbl_registrationUpsertWithoutTbl_reg_classesInput;

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:true})
    @Type(() => tbl_registrationWhereUniqueInput)
    connect?: tbl_registrationWhereUniqueInput;

    @Field(() => tbl_registrationUpdateWithoutTbl_reg_classesInput, {nullable:true})
    @Type(() => tbl_registrationUpdateWithoutTbl_reg_classesInput)
    update?: tbl_registrationUpdateWithoutTbl_reg_classesInput;
}
