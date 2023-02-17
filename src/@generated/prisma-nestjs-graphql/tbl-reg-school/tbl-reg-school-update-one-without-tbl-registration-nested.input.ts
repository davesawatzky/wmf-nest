import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_schoolCreateWithoutTbl_registrationInput } from './tbl-reg-school-create-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_reg_schoolCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-school-create-or-connect-without-tbl-registration.input';
import { tbl_reg_schoolUpsertWithoutTbl_registrationInput } from './tbl-reg-school-upsert-without-tbl-registration.input';
import { tbl_reg_schoolWhereUniqueInput } from './tbl-reg-school-where-unique.input';
import { tbl_reg_schoolUpdateWithoutTbl_registrationInput } from './tbl-reg-school-update-without-tbl-registration.input';

@InputType()
export class tbl_reg_schoolUpdateOneWithoutTbl_registrationNestedInput {

    @Field(() => tbl_reg_schoolCreateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_schoolCreateWithoutTbl_registrationInput)
    create?: tbl_reg_schoolCreateWithoutTbl_registrationInput;

    @Field(() => tbl_reg_schoolCreateOrConnectWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_schoolCreateOrConnectWithoutTbl_registrationInput)
    connectOrCreate?: tbl_reg_schoolCreateOrConnectWithoutTbl_registrationInput;

    @Field(() => tbl_reg_schoolUpsertWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_schoolUpsertWithoutTbl_registrationInput)
    upsert?: tbl_reg_schoolUpsertWithoutTbl_registrationInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => Boolean, {nullable:true})
    delete?: boolean;

    @Field(() => tbl_reg_schoolWhereUniqueInput, {nullable:true})
    @Type(() => tbl_reg_schoolWhereUniqueInput)
    connect?: tbl_reg_schoolWhereUniqueInput;

    @Field(() => tbl_reg_schoolUpdateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_schoolUpdateWithoutTbl_registrationInput)
    update?: tbl_reg_schoolUpdateWithoutTbl_registrationInput;
}
