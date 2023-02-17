import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Tbl_classlistCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    classNumber!: number;

    @Field(() => Int, {nullable:false})
    subdisciplineID!: number;

    @Field(() => Int, {nullable:false})
    categoryID!: number;

    @Field(() => Int, {nullable:false})
    levelID!: number;

    @Field(() => Int, {nullable:false})
    minSelection!: number;

    @Field(() => Int, {nullable:false})
    maxSelection!: number;

    @Field(() => Int, {nullable:false})
    requiredSelection!: number;

    @Field(() => Int, {nullable:false})
    SGSlabel!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
