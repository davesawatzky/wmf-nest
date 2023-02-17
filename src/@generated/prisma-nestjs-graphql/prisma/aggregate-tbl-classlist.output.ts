import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Tbl_classlistCountAggregate } from './tbl-classlist-count-aggregate.output';
import { Tbl_classlistAvgAggregate } from './tbl-classlist-avg-aggregate.output';
import { Tbl_classlistSumAggregate } from './tbl-classlist-sum-aggregate.output';
import { Tbl_classlistMinAggregate } from './tbl-classlist-min-aggregate.output';
import { Tbl_classlistMaxAggregate } from './tbl-classlist-max-aggregate.output';

@ObjectType()
export class AggregateTbl_classlist {

    @Field(() => Tbl_classlistCountAggregate, {nullable:true})
    _count?: Tbl_classlistCountAggregate;

    @Field(() => Tbl_classlistAvgAggregate, {nullable:true})
    _avg?: Tbl_classlistAvgAggregate;

    @Field(() => Tbl_classlistSumAggregate, {nullable:true})
    _sum?: Tbl_classlistSumAggregate;

    @Field(() => Tbl_classlistMinAggregate, {nullable:true})
    _min?: Tbl_classlistMinAggregate;

    @Field(() => Tbl_classlistMaxAggregate, {nullable:true})
    _max?: Tbl_classlistMaxAggregate;
}
