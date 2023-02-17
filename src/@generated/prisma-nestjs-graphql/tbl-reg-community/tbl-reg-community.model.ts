import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_registration } from '../tbl-registration/tbl-registration.model';

@ObjectType()
export class tbl_reg_community {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    regID!: number;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => Int, {nullable:true})
    groupSize!: number | null;

    @Field(() => Int, {nullable:true})
    chaperones!: number | null;

    @Field(() => Int, {nullable:true})
    wheelchairs!: number | null;

    @Field(() => String, {nullable:true})
    earliestTime!: string | null;

    @Field(() => String, {nullable:true})
    latestTime!: string | null;

    @Field(() => String, {nullable:true})
    unavailable!: string | null;

    @Field(() => String, {nullable:true})
    conflictPerformers!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => tbl_registration, {nullable:false})
    tbl_registration?: tbl_registration;
}
