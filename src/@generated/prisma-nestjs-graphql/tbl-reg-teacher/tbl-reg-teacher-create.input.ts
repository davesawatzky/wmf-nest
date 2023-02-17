import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { tbl_registrationCreateNestedOneWithoutTbl_reg_teacherInput } from '../tbl-registration/tbl-registration-create-nested-one-without-tbl-reg-teacher.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_reg_teacherCreateInput {

    @Field(() => String, {nullable:true})
    prefix?: string;

    @Field(() => String, {nullable:true})
    lastName?: string;

    @Field(() => String, {nullable:true})
    firstName?: string;

    @Field(() => String, {nullable:true})
    apartment?: string;

    @Field(() => String, {nullable:true})
    streetNumber?: string;

    @Field(() => String, {nullable:true})
    streetName?: string;

    @Field(() => String, {nullable:true})
    city?: string;

    @Field(() => String, {nullable:true})
    @Validator.MaxLength(3)
    province?: string;

    @Field(() => String, {nullable:true})
    @Validator.IsPostalCode('CA')
    postalCode?: string;

    @Field(() => String, {nullable:true})
    @Validator.IsPhoneNumber('CA')
    phone?: string;

    @Field(() => String, {nullable:true})
    @Validator.IsEmail()
    email?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => tbl_registrationCreateNestedOneWithoutTbl_reg_teacherInput, {nullable:false})
    @Type(() => tbl_registrationCreateNestedOneWithoutTbl_reg_teacherInput)
    tbl_registration!: tbl_registrationCreateNestedOneWithoutTbl_reg_teacherInput;
}
