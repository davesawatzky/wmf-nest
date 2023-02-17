import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Tbl_categoryCountAggregate } from './tbl-category-count-aggregate.output';
import { Tbl_categoryAvgAggregate } from './tbl-category-avg-aggregate.output';
import { Tbl_categorySumAggregate } from './tbl-category-sum-aggregate.output';
import { Tbl_categoryMinAggregate } from './tbl-category-min-aggregate.output';
import { Tbl_categoryMaxAggregate } from './tbl-category-max-aggregate.output';

@ObjectType()
export class Tbl_categoryGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => String, {nullable:true})
    requiredComposer?: string;

    @Field(() => Tbl_categoryCountAggregate, {nullable:true})
    _count?: Tbl_categoryCountAggregate;

    @Field(() => Tbl_categoryAvgAggregate, {nullable:true})
    _avg?: Tbl_categoryAvgAggregate;

    @Field(() => Tbl_categorySumAggregate, {nullable:true})
    _sum?: Tbl_categorySumAggregate;

    @Field(() => Tbl_categoryMinAggregate, {nullable:true})
    _min?: Tbl_categoryMinAggregate;

    @Field(() => Tbl_categoryMaxAggregate, {nullable:true})
    _max?: Tbl_categoryMaxAggregate;
}
