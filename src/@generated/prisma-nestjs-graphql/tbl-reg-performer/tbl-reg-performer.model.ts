import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_registration } from '../tbl-registration/tbl-registration.model';

@ObjectType()
export class tbl_reg_performer {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    regID!: number;

    @Field(() => String, {nullable:true})
    lastName!: string | null;

    @Field(() => String, {nullable:true})
    firstName!: string | null;

    @Field(() => String, {nullable:true})
    apartment!: string | null;

    @Field(() => String, {nullable:true})
    streetNumber!: string | null;

    @Field(() => String, {nullable:true})
    streetName!: string | null;

    @Field(() => String, {nullable:false,defaultValue:'Winnipeg'})
    city!: string;

    @Field(() => String, {nullable:false,defaultValue:'MB'})
    province!: string;

    @Field(() => String, {nullable:true})
    postalCode!: string | null;

    @Field(() => String, {nullable:true})
    phone!: string | null;

    @Field(() => String, {nullable:true})
    email!: string | null;

    @Field(() => Int, {nullable:true})
    age!: number | null;

    @Field(() => String, {nullable:true})
    instrument!: string | null;

    @Field(() => String, {nullable:true})
    level!: string | null;

    @Field(() => String, {nullable:true})
    otherClasses!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => tbl_registration, {nullable:false})
    tbl_registration?: tbl_registration;
}
