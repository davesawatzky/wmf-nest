import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Tbl_userCountAggregate } from './tbl-user-count-aggregate.output';
import { Tbl_userAvgAggregate } from './tbl-user-avg-aggregate.output';
import { Tbl_userSumAggregate } from './tbl-user-sum-aggregate.output';
import { Tbl_userMinAggregate } from './tbl-user-min-aggregate.output';
import { Tbl_userMaxAggregate } from './tbl-user-max-aggregate.output';

@ObjectType()
export class Tbl_userGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => Boolean, {nullable:false})
    staff!: boolean;

    @Field(() => Boolean, {nullable:false})
    admin!: boolean;

    @Field(() => String, {nullable:true})
    firstName?: string;

    @Field(() => String, {nullable:true})
    lastName?: string;

    @Field(() => String, {nullable:true})
    apartment?: string;

    @Field(() => String, {nullable:true})
    streetNumber?: string;

    @Field(() => String, {nullable:true})
    streetName?: string;

    @Field(() => String, {nullable:true})
    city?: string;

    @Field(() => String, {nullable:true})
    province?: string;

    @Field(() => String, {nullable:true})
    postalCode?: string;

    @Field(() => String, {nullable:true})
    phone?: string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Tbl_userCountAggregate, {nullable:true})
    _count?: Tbl_userCountAggregate;

    @Field(() => Tbl_userAvgAggregate, {nullable:true})
    _avg?: Tbl_userAvgAggregate;

    @Field(() => Tbl_userSumAggregate, {nullable:true})
    _sum?: Tbl_userSumAggregate;

    @Field(() => Tbl_userMinAggregate, {nullable:true})
    _min?: Tbl_userMinAggregate;

    @Field(() => Tbl_userMaxAggregate, {nullable:true})
    _max?: Tbl_userMaxAggregate;
}
