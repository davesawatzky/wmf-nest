import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_registrationUpdateWithoutTbl_userInput } from './tbl-registration-update-without-tbl-user.input';

@InputType()
export class tbl_registrationUpdateWithWhereUniqueWithoutTbl_userInput {

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:false})
    @Type(() => tbl_registrationWhereUniqueInput)
    where!: tbl_registrationWhereUniqueInput;

    @Field(() => tbl_registrationUpdateWithoutTbl_userInput, {nullable:false})
    @Type(() => tbl_registrationUpdateWithoutTbl_userInput)
    data!: tbl_registrationUpdateWithoutTbl_userInput;
}
