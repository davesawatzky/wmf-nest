import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class tbl_reg_schoolCreateManyInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:false})
    regID!: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    division?: string;

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

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
