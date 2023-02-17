import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_userCreateWithoutTbl_registrationInput } from './tbl-user-create-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_userCreateOrConnectWithoutTbl_registrationInput } from './tbl-user-create-or-connect-without-tbl-registration.input';
import { tbl_userUpsertWithoutTbl_registrationInput } from './tbl-user-upsert-without-tbl-registration.input';
import { tbl_userWhereUniqueInput } from './tbl-user-where-unique.input';
import { tbl_userUpdateWithoutTbl_registrationInput } from './tbl-user-update-without-tbl-registration.input';

@InputType()
export class tbl_userUpdateOneWithoutTbl_registrationNestedInput {

    @Field(() => tbl_userCreateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_userCreateWithoutTbl_registrationInput)
    create?: tbl_userCreateWithoutTbl_registrationInput;

    @Field(() => tbl_userCreateOrConnectWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_userCreateOrConnectWithoutTbl_registrationInput)
    connectOrCreate?: tbl_userCreateOrConnectWithoutTbl_registrationInput;

    @Field(() => tbl_userUpsertWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_userUpsertWithoutTbl_registrationInput)
    upsert?: tbl_userUpsertWithoutTbl_registrationInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => Boolean, {nullable:true})
    delete?: boolean;

    @Field(() => tbl_userWhereUniqueInput, {nullable:true})
    @Type(() => tbl_userWhereUniqueInput)
    connect?: tbl_userWhereUniqueInput;

    @Field(() => tbl_userUpdateWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_userUpdateWithoutTbl_registrationInput)
    update?: tbl_userUpdateWithoutTbl_registrationInput;
}
