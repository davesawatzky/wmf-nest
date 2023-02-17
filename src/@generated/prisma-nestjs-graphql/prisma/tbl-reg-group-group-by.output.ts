import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Tbl_reg_groupCountAggregate } from './tbl-reg-group-count-aggregate.output';
import { Tbl_reg_groupAvgAggregate } from './tbl-reg-group-avg-aggregate.output';
import { Tbl_reg_groupSumAggregate } from './tbl-reg-group-sum-aggregate.output';
import { Tbl_reg_groupMinAggregate } from './tbl-reg-group-min-aggregate.output';
import { Tbl_reg_groupMaxAggregate } from './tbl-reg-group-max-aggregate.output';

@ObjectType()
export class Tbl_reg_groupGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    regID!: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    groupType?: string;

    @Field(() => Int, {nullable:true})
    numberOfPerformers?: number;

    @Field(() => Int, {nullable:true})
    age?: number;

    @Field(() => String, {nullable:true})
    instruments?: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => Tbl_reg_groupCountAggregate, {nullable:true})
    _count?: Tbl_reg_groupCountAggregate;

    @Field(() => Tbl_reg_groupAvgAggregate, {nullable:true})
    _avg?: Tbl_reg_groupAvgAggregate;

    @Field(() => Tbl_reg_groupSumAggregate, {nullable:true})
    _sum?: Tbl_reg_groupSumAggregate;

    @Field(() => Tbl_reg_groupMinAggregate, {nullable:true})
    _min?: Tbl_reg_groupMinAggregate;

    @Field(() => Tbl_reg_groupMaxAggregate, {nullable:true})
    _max?: Tbl_reg_groupMaxAggregate;
}
