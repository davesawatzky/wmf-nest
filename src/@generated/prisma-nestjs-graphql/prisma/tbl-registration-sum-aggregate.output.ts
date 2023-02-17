import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class Tbl_registrationSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    userID?: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    totalAmt?: Decimal;

    @Field(() => GraphQLDecimal, {nullable:true})
    payedAmt?: Decimal;
}
