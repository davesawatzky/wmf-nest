import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Tbl_sacredCountAggregate } from './tbl-sacred-count-aggregate.output';
import { Tbl_sacredAvgAggregate } from './tbl-sacred-avg-aggregate.output';
import { Tbl_sacredSumAggregate } from './tbl-sacred-sum-aggregate.output';
import { Tbl_sacredMinAggregate } from './tbl-sacred-min-aggregate.output';
import { Tbl_sacredMaxAggregate } from './tbl-sacred-max-aggregate.output';

@ObjectType()
export class Tbl_sacredGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    composer!: string;

    @Field(() => String, {nullable:false})
    largeWork!: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => Tbl_sacredCountAggregate, {nullable:true})
    _count?: Tbl_sacredCountAggregate;

    @Field(() => Tbl_sacredAvgAggregate, {nullable:true})
    _avg?: Tbl_sacredAvgAggregate;

    @Field(() => Tbl_sacredSumAggregate, {nullable:true})
    _sum?: Tbl_sacredSumAggregate;

    @Field(() => Tbl_sacredMinAggregate, {nullable:true})
    _min?: Tbl_sacredMinAggregate;

    @Field(() => Tbl_sacredMaxAggregate, {nullable:true})
    _max?: Tbl_sacredMaxAggregate;
}
