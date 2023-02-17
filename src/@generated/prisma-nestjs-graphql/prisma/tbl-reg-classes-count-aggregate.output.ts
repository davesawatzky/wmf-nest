import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Tbl_reg_classesCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    regID!: number;

    @Field(() => Int, {nullable:false})
    classNumber!: number;

    @Field(() => Int, {nullable:false})
    discipline!: number;

    @Field(() => Int, {nullable:false})
    subdiscipline!: number;

    @Field(() => Int, {nullable:false})
    level!: number;

    @Field(() => Int, {nullable:false})
    category!: number;

    @Field(() => Int, {nullable:false})
    numberOfSelections!: number;

    @Field(() => Int, {nullable:false})
    schoolCommunityId!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:false})
    createdAt!: number;

    @Field(() => Int, {nullable:false})
    updatedAt!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
