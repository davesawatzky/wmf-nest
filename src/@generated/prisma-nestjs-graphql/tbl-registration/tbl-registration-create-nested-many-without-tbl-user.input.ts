import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateWithoutTbl_userInput } from './tbl-registration-create-without-tbl-user.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateOrConnectWithoutTbl_userInput } from './tbl-registration-create-or-connect-without-tbl-user.input';
import { tbl_registrationCreateManyTbl_userInputEnvelope } from './tbl-registration-create-many-tbl-user-input-envelope.input';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';

@InputType()
export class tbl_registrationCreateNestedManyWithoutTbl_userInput {

    @Field(() => [tbl_registrationCreateWithoutTbl_userInput], {nullable:true})
    @Type(() => tbl_registrationCreateWithoutTbl_userInput)
    create?: Array<tbl_registrationCreateWithoutTbl_userInput>;

    @Field(() => [tbl_registrationCreateOrConnectWithoutTbl_userInput], {nullable:true})
    @Type(() => tbl_registrationCreateOrConnectWithoutTbl_userInput)
    connectOrCreate?: Array<tbl_registrationCreateOrConnectWithoutTbl_userInput>;

    @Field(() => tbl_registrationCreateManyTbl_userInputEnvelope, {nullable:true})
    @Type(() => tbl_registrationCreateManyTbl_userInputEnvelope)
    createMany?: tbl_registrationCreateManyTbl_userInputEnvelope;

    @Field(() => [tbl_registrationWhereUniqueInput], {nullable:true})
    @Type(() => tbl_registrationWhereUniqueInput)
    connect?: Array<tbl_registrationWhereUniqueInput>;
}
