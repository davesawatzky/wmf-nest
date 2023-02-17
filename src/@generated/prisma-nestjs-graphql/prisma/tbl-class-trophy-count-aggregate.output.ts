import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Tbl_class_trophyCountAggregate {

    @Field(() => Int, {nullable:false})
    classID!: number;

    @Field(() => Int, {nullable:false})
    trophyID!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
