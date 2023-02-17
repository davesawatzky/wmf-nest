import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_performerWhereUniqueInput } from './tbl-reg-performer-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_reg_performerUpdateWithoutTbl_registrationInput } from './tbl-reg-performer-update-without-tbl-registration.input';

@InputType()
export class tbl_reg_performerUpdateWithWhereUniqueWithoutTbl_registrationInput {

    @Field(() => tbl_reg_performerWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_performerWhereUniqueInput)
    where!: tbl_reg_performerWhereUniqueInput;

    @Field(() => tbl_reg_performerUpdateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_performerUpdateWithoutTbl_registrationInput)
    data!: tbl_reg_performerUpdateWithoutTbl_registrationInput;
}
