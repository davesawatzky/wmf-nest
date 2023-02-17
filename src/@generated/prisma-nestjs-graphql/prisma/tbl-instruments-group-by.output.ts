import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Tbl_instrumentsCountAggregate } from './tbl-instruments-count-aggregate.output';
import { Tbl_instrumentsAvgAggregate } from './tbl-instruments-avg-aggregate.output';
import { Tbl_instrumentsSumAggregate } from './tbl-instruments-sum-aggregate.output';
import { Tbl_instrumentsMinAggregate } from './tbl-instruments-min-aggregate.output';
import { Tbl_instrumentsMaxAggregate } from './tbl-instruments-max-aggregate.output';

@ObjectType()
export class Tbl_instrumentsGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Tbl_instrumentsCountAggregate, {nullable:true})
    _count?: Tbl_instrumentsCountAggregate;

    @Field(() => Tbl_instrumentsAvgAggregate, {nullable:true})
    _avg?: Tbl_instrumentsAvgAggregate;

    @Field(() => Tbl_instrumentsSumAggregate, {nullable:true})
    _sum?: Tbl_instrumentsSumAggregate;

    @Field(() => Tbl_instrumentsMinAggregate, {nullable:true})
    _min?: Tbl_instrumentsMinAggregate;

    @Field(() => Tbl_instrumentsMaxAggregate, {nullable:true})
    _max?: Tbl_instrumentsMaxAggregate;
}
