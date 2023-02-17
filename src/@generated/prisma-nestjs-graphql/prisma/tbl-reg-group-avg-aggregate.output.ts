import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class Tbl_reg_groupAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    regID?: number;

    @Field(() => Float, {nullable:true})
    numberOfPerformers?: number;

    @Field(() => Float, {nullable:true})
    age?: number;
}
