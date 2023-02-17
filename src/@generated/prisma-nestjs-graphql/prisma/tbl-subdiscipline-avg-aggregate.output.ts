import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class Tbl_subdisciplineAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    disciplineID?: number;

    @Field(() => Float, {nullable:true})
    maxPerformers?: number;

    @Field(() => Float, {nullable:true})
    minPerformers?: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    price?: Decimal;
}
