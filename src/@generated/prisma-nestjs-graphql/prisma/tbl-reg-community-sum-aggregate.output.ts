import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Tbl_reg_communitySumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    regID?: number;

    @Field(() => Int, {nullable:true})
    groupSize?: number;

    @Field(() => Int, {nullable:true})
    chaperones?: number;

    @Field(() => Int, {nullable:true})
    wheelchairs?: number;
}
