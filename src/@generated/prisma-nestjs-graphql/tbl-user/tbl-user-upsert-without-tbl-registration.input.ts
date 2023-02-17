import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_userUpdateWithoutTbl_registrationInput } from './tbl-user-update-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_userCreateWithoutTbl_registrationInput } from './tbl-user-create-without-tbl-registration.input';

@InputType()
export class tbl_userUpsertWithoutTbl_registrationInput {

    @Field(() => tbl_userUpdateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_userUpdateWithoutTbl_registrationInput)
    update!: tbl_userUpdateWithoutTbl_registrationInput;

    @Field(() => tbl_userCreateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_userCreateWithoutTbl_registrationInput)
    create!: tbl_userCreateWithoutTbl_registrationInput;
}
