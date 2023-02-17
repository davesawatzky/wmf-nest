import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Tbl_reg_communityMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    regID?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => Int, {nullable:true})
    groupSize?: number;

    @Field(() => Int, {nullable:true})
    chaperones?: number;

    @Field(() => Int, {nullable:true})
    wheelchairs?: number;

    @Field(() => String, {nullable:true})
    earliestTime?: string;

    @Field(() => String, {nullable:true})
    latestTime?: string;

    @Field(() => String, {nullable:true})
    unavailable?: string;

    @Field(() => String, {nullable:true})
    conflictPerformers?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
