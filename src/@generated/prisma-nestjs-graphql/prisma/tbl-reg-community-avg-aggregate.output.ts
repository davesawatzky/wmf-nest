import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class Tbl_reg_communityAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    regID?: number;

    @Field(() => Float, {nullable:true})
    groupSize?: number;

    @Field(() => Float, {nullable:true})
    chaperones?: number;

    @Field(() => Float, {nullable:true})
    wheelchairs?: number;
}
