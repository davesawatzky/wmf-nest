import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_registration_performerType } from './tbl-registration-performer-type.enum';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { tbl_reg_classesUncheckedCreateNestedManyWithoutTbl_registrationInput } from '../tbl-reg-classes/tbl-reg-classes-unchecked-create-nested-many-without-tbl-registration.input';
import { tbl_reg_communityUncheckedCreateNestedManyWithoutTbl_registrationInput } from '../tbl-reg-community/tbl-reg-community-unchecked-create-nested-many-without-tbl-registration.input';
import { tbl_reg_groupUncheckedCreateNestedManyWithoutTbl_registrationInput } from '../tbl-reg-group/tbl-reg-group-unchecked-create-nested-many-without-tbl-registration.input';
import { tbl_reg_performerUncheckedCreateNestedManyWithoutTbl_registrationInput } from '../tbl-reg-performer/tbl-reg-performer-unchecked-create-nested-many-without-tbl-registration.input';
import { tbl_reg_schoolUncheckedCreateNestedOneWithoutTbl_registrationInput } from '../tbl-reg-school/tbl-reg-school-unchecked-create-nested-one-without-tbl-registration.input';

@InputType()
export class tbl_registrationUncheckedCreateWithoutTbl_reg_teacherInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    userID?: number;

    @Field(() => String, {nullable:true})
    label?: string;

    @Field(() => tbl_registration_performerType, {nullable:true})
    performerType?: keyof typeof tbl_registration_performerType;

    @Field(() => Date, {nullable:true})
    submittedAt?: Date | string;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    totalAmt?: Decimal;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    payedAmt?: Decimal;

    @Field(() => String, {nullable:true})
    transactionInfo?: string;

    @Field(() => String, {nullable:true})
    confirmation?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => tbl_reg_classesUncheckedCreateNestedManyWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_classesUncheckedCreateNestedManyWithoutTbl_registrationInput)
    tbl_reg_classes?: tbl_reg_classesUncheckedCreateNestedManyWithoutTbl_registrationInput;

    @Field(() => tbl_reg_communityUncheckedCreateNestedManyWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_communityUncheckedCreateNestedManyWithoutTbl_registrationInput)
    tbl_reg_community?: tbl_reg_communityUncheckedCreateNestedManyWithoutTbl_registrationInput;

    @Field(() => tbl_reg_groupUncheckedCreateNestedManyWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_groupUncheckedCreateNestedManyWithoutTbl_registrationInput)
    tbl_reg_group?: tbl_reg_groupUncheckedCreateNestedManyWithoutTbl_registrationInput;

    @Field(() => tbl_reg_performerUncheckedCreateNestedManyWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_performerUncheckedCreateNestedManyWithoutTbl_registrationInput)
    tbl_reg_performer?: tbl_reg_performerUncheckedCreateNestedManyWithoutTbl_registrationInput;

    @Field(() => tbl_reg_schoolUncheckedCreateNestedOneWithoutTbl_registrationInput, {nullable:true})
    @Type(() => tbl_reg_schoolUncheckedCreateNestedOneWithoutTbl_registrationInput)
    tbl_reg_school?: tbl_reg_schoolUncheckedCreateNestedOneWithoutTbl_registrationInput;
}
