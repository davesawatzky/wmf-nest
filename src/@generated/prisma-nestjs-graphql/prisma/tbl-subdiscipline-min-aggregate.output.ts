import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_subdiscipline_SGSlabel } from './tbl-subdiscipline-sg-slabel.enum';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class Tbl_subdisciplineMinAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    disciplineID?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Int, {nullable:true})
    maxPerformers?: number;

    @Field(() => Int, {nullable:true})
    minPerformers?: number;

    @Field(() => tbl_subdiscipline_SGSlabel, {nullable:true})
    SGSlabel?: keyof typeof tbl_subdiscipline_SGSlabel;

    @Field(() => GraphQLDecimal, {nullable:true})
    price?: Decimal;
}
