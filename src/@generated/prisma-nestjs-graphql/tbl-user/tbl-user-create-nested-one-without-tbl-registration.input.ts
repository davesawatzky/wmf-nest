import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_userCreateWithoutTbl_registrationInput } from './tbl-user-create-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_userCreateOrConnectWithoutTbl_registrationInput } from './tbl-user-create-or-connect-without-tbl-registration.input';
import { tbl_userWhereUniqueInput } from './tbl-user-where-unique.input';

@InputType()
export class tbl_userCreateNestedOneWithoutTbl_registrationInput {

    @Field(() => tbl_userCreateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_userCreateWithoutTbl_registrationInput)
    create?: tbl_userCreateWithoutTbl_registrationInput;

    @Field(() => tbl_userCreateOrConnectWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_userCreateOrConnectWithoutTbl_registrationInput)
    connectOrCreate?: tbl_userCreateOrConnectWithoutTbl_registrationInput;

    @Field(() => tbl_userWhereUniqueInput, {nullable:true})
    @Type(() => tbl_userWhereUniqueInput)
    connect?: tbl_userWhereUniqueInput;
}
