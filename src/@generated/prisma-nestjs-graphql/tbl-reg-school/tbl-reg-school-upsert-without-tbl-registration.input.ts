import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_schoolUpdateWithoutTbl_registrationInput } from './tbl-reg-school-update-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_reg_schoolCreateWithoutTbl_registrationInput } from './tbl-reg-school-create-without-tbl-registration.input';

@InputType()
export class tbl_reg_schoolUpsertWithoutTbl_registrationInput {

    @Field(() => tbl_reg_schoolUpdateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_schoolUpdateWithoutTbl_registrationInput)
    update!: tbl_reg_schoolUpdateWithoutTbl_registrationInput;

    @Field(() => tbl_reg_schoolCreateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_schoolCreateWithoutTbl_registrationInput)
    create!: tbl_reg_schoolCreateWithoutTbl_registrationInput;
}
