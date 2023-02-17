import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_schoolWhereUniqueInput } from './tbl-reg-school-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_reg_schoolCreateWithoutTbl_registrationInput } from './tbl-reg-school-create-without-tbl-registration.input';

@InputType()
export class tbl_reg_schoolCreateOrConnectWithoutTbl_registrationInput {

    @Field(() => tbl_reg_schoolWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_schoolWhereUniqueInput)
    where!: tbl_reg_schoolWhereUniqueInput;

    @Field(() => tbl_reg_schoolCreateWithoutTbl_registrationInput, {nullable:false})
    @Type(() => tbl_reg_schoolCreateWithoutTbl_registrationInput)
    create!: tbl_reg_schoolCreateWithoutTbl_registrationInput;
}
