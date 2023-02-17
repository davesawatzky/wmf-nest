import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_registration_performerType } from '../tbl-registration/tbl-registration-performer-type.enum';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Tbl_registrationCountAggregate } from './tbl-registration-count-aggregate.output';
import { Tbl_registrationAvgAggregate } from './tbl-registration-avg-aggregate.output';
import { Tbl_registrationSumAggregate } from './tbl-registration-sum-aggregate.output';
import { Tbl_registrationMinAggregate } from './tbl-registration-min-aggregate.output';
import { Tbl_registrationMaxAggregate } from './tbl-registration-max-aggregate.output';

@ObjectType()
export class Tbl_registrationGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:true})
    userID?: number;

    @Field(() => String, {nullable:false})
    label!: string;

    @Field(() => tbl_registration_performerType, {nullable:false})
    performerType!: keyof typeof tbl_registration_performerType;

    @Field(() => Date, {nullable:true})
    submittedAt?: Date | string;

    @Field(() => GraphQLDecimal, {nullable:true})
    totalAmt?: Decimal;

    @Field(() => GraphQLDecimal, {nullable:true})
    payedAmt?: Decimal;

    @Field(() => String, {nullable:true})
    transactionInfo?: string;

    @Field(() => String, {nullable:true})
    confirmation?: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => Tbl_registrationCountAggregate, {nullable:true})
    _count?: Tbl_registrationCountAggregate;

    @Field(() => Tbl_registrationAvgAggregate, {nullable:true})
    _avg?: Tbl_registrationAvgAggregate;

    @Field(() => Tbl_registrationSumAggregate, {nullable:true})
    _sum?: Tbl_registrationSumAggregate;

    @Field(() => Tbl_registrationMinAggregate, {nullable:true})
    _min?: Tbl_registrationMinAggregate;

    @Field(() => Tbl_registrationMaxAggregate, {nullable:true})
    _max?: Tbl_registrationMaxAggregate;
}
