import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationUpdateWithoutTbl_reg_communityInput } from './tbl-registration-update-without-tbl-reg-community.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateWithoutTbl_reg_communityInput } from './tbl-registration-create-without-tbl-reg-community.input';

@InputType()
export class tbl_registrationUpsertWithoutTbl_reg_communityInput {

    @Field(() => tbl_registrationUpdateWithoutTbl_reg_communityInput, {nullable:false})
    @Type(() => tbl_registrationUpdateWithoutTbl_reg_communityInput)
    update!: tbl_registrationUpdateWithoutTbl_reg_communityInput;

    @Field(() => tbl_registrationCreateWithoutTbl_reg_communityInput, {nullable:false})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_communityInput)
    create!: tbl_registrationCreateWithoutTbl_reg_communityInput;
}
