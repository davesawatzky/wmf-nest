import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { Int } from '@nestjs/graphql';

@InputType()
export class tbl_reg_performerCreateWithoutTbl_registrationInput {

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

    @Field(() => Int, {nullable:true})
    age?: number;

    @Field(() => String, {nullable:true})
    instrument?: string;

    @Field(() => String, {nullable:true})
    level?: string;

    @Field(() => String, {nullable:true})
    otherClasses?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
