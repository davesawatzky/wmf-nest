import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateWithoutTbl_reg_groupInput } from './tbl-registration-create-without-tbl-reg-group.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput } from './tbl-registration-create-or-connect-without-tbl-reg-group.input';
import { tbl_registrationUpsertWithoutTbl_reg_groupInput } from './tbl-registration-upsert-without-tbl-reg-group.input';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';
import { tbl_registrationUpdateWithoutTbl_reg_groupInput } from './tbl-registration-update-without-tbl-reg-group.input';

@InputType()
export class tbl_registrationUpdateOneRequiredWithoutTbl_reg_groupNestedInput {

    @Field(() => tbl_registrationCreateWithoutTbl_reg_groupInput, {nullable:true})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_groupInput)
    create?: tbl_registrationCreateWithoutTbl_reg_groupInput;

    @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput, {nullable:true})
    @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput)
    connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput;

    @Field(() => tbl_registrationUpsertWithoutTbl_reg_groupInput, {nullable:true})
    @Type(() => tbl_registrationUpsertWithoutTbl_reg_groupInput)
    upsert?: tbl_registrationUpsertWithoutTbl_reg_groupInput;

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:true})
    @Type(() => tbl_registrationWhereUniqueInput)
    connect?: tbl_registrationWhereUniqueInput;

    @Field(() => tbl_registrationUpdateWithoutTbl_reg_groupInput, {nullable:true})
    @Type(() => tbl_registrationUpdateWithoutTbl_reg_groupInput)
    update?: tbl_registrationUpdateWithoutTbl_reg_groupInput;
}
