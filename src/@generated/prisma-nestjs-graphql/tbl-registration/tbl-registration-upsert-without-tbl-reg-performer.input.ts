import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationUpdateWithoutTbl_reg_performerInput } from './tbl-registration-update-without-tbl-reg-performer.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateWithoutTbl_reg_performerInput } from './tbl-registration-create-without-tbl-reg-performer.input';

@InputType()
export class tbl_registrationUpsertWithoutTbl_reg_performerInput {

    @Field(() => tbl_registrationUpdateWithoutTbl_reg_performerInput, {nullable:false})
    @Type(() => tbl_registrationUpdateWithoutTbl_reg_performerInput)
    update!: tbl_registrationUpdateWithoutTbl_reg_performerInput;

    @Field(() => tbl_registrationCreateWithoutTbl_reg_performerInput, {nullable:false})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_performerInput)
    create!: tbl_registrationCreateWithoutTbl_reg_performerInput;
}
