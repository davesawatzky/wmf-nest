import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Tbl_reg_communityCountAggregate } from './tbl-reg-community-count-aggregate.output';
import { Tbl_reg_communityAvgAggregate } from './tbl-reg-community-avg-aggregate.output';
import { Tbl_reg_communitySumAggregate } from './tbl-reg-community-sum-aggregate.output';
import { Tbl_reg_communityMinAggregate } from './tbl-reg-community-min-aggregate.output';
import { Tbl_reg_communityMaxAggregate } from './tbl-reg-community-max-aggregate.output';

@ObjectType()
export class AggregateTbl_reg_community {

    @Field(() => Tbl_reg_communityCountAggregate, {nullable:true})
    _count?: Tbl_reg_communityCountAggregate;

    @Field(() => Tbl_reg_communityAvgAggregate, {nullable:true})
    _avg?: Tbl_reg_communityAvgAggregate;

    @Field(() => Tbl_reg_communitySumAggregate, {nullable:true})
    _sum?: Tbl_reg_communitySumAggregate;

    @Field(() => Tbl_reg_communityMinAggregate, {nullable:true})
    _min?: Tbl_reg_communityMinAggregate;

    @Field(() => Tbl_reg_communityMaxAggregate, {nullable:true})
    _max?: Tbl_reg_communityMaxAggregate;
}
