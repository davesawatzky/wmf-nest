import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Tbl_reg_classesCountAggregate } from './tbl-reg-classes-count-aggregate.output';
import { Tbl_reg_classesAvgAggregate } from './tbl-reg-classes-avg-aggregate.output';
import { Tbl_reg_classesSumAggregate } from './tbl-reg-classes-sum-aggregate.output';
import { Tbl_reg_classesMinAggregate } from './tbl-reg-classes-min-aggregate.output';
import { Tbl_reg_classesMaxAggregate } from './tbl-reg-classes-max-aggregate.output';

@ObjectType()
export class Tbl_reg_classesGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    regID!: number;

    @Field(() => String, {nullable:true})
    classNumber?: string;

    @Field(() => String, {nullable:true})
    discipline?: string;

    @Field(() => String, {nullable:true})
    subdiscipline?: string;

    @Field(() => String, {nullable:true})
    level?: string;

    @Field(() => String, {nullable:true})
    category?: string;

    @Field(() => Int, {nullable:true})
    numberOfSelections?: number;

    @Field(() => Int, {nullable:true})
    schoolCommunityId?: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    price?: Decimal;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => Tbl_reg_classesCountAggregate, {nullable:true})
    _count?: Tbl_reg_classesCountAggregate;

    @Field(() => Tbl_reg_classesAvgAggregate, {nullable:true})
    _avg?: Tbl_reg_classesAvgAggregate;

    @Field(() => Tbl_reg_classesSumAggregate, {nullable:true})
    _sum?: Tbl_reg_classesSumAggregate;

    @Field(() => Tbl_reg_classesMinAggregate, {nullable:true})
    _min?: Tbl_reg_classesMinAggregate;

    @Field(() => Tbl_reg_classesMaxAggregate, {nullable:true})
    _max?: Tbl_reg_classesMaxAggregate;
}
