import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_communityWhereUniqueInput } from './tbl-reg-community-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_reg_communityCreateWithoutTbl_registrationInput } from './tbl-reg-community-create-without-tbl-registration.input';

@InputType()
export class tbl_reg_communityCreateOrConnectWithoutTbl_registrationInput {

    @Field(() => tbl_reg_communityWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_communityWhereUniqueInput)
    where!: tbl_reg_communityWhereUniqueInput;

    @Field(() => tbl_reg_communityCreateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_communityCreateWithoutTbl_registrationInput)
    create!: tbl_reg_communityCreateWithoutTbl_registrationInput;
}
