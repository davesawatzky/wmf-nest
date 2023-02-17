import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_registration_performerType } from '../tbl-registration/tbl-registration-performer-type.enum';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class Tbl_registrationMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    userID?: number;

    @Field(() => String, {nullable:true})
    label?: string;

    @Field(() => tbl_registration_performerType, {nullable:true})
    performerType?: keyof typeof tbl_registration_performerType;

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

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
