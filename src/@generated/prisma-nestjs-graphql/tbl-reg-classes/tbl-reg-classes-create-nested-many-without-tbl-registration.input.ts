import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_classesCreateWithoutTbl_registrationInput } from './tbl-reg-classes-create-without-tbl-registration.input';
import { Type } from 'class-transformer';
import { tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-classes-create-or-connect-without-tbl-registration.input';
import { tbl_reg_classesCreateManyTbl_registrationInputEnvelope } from './tbl-reg-classes-create-many-tbl-registration-input-envelope.input';
import { tbl_reg_classesWhereUniqueInput } from './tbl-reg-classes-where-unique.input';

@InputType()
export class tbl_reg_classesCreateNestedManyWithoutTbl_registrationInput {

    @Field(() => [tbl_reg_classesCreateWithoutTbl_registrationInput], {nullable:true})
    @Type(() => tbl_reg_classesCreateWithoutTbl_registrationInput)
    create?: Array<tbl_reg_classesCreateWithoutTbl_registrationInput>;

    @Field(() => [tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput], {nullable:true})
    @Type(() => tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput)
    connectOrCreate?: Array<tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput>;

    @Field(() => tbl_reg_classesCreateManyTbl_registrationInputEnvelope, {nullable:true})
    @Type(() => tbl_reg_classesCreateManyTbl_registrationInputEnvelope)
    createMany?: tbl_reg_classesCreateManyTbl_registrationInputEnvelope;

    @Field(() => [tbl_reg_classesWhereUniqueInput], {nullable:true})
    @Type(() => tbl_reg_classesWhereUniqueInput)
    connect?: Array<tbl_reg_classesWhereUniqueInput>;
}
