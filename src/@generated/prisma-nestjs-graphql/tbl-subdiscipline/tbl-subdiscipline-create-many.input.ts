import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_subdiscipline_SGSlabel } from '../prisma/tbl-subdiscipline-sg-slabel.enum';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';

@InputType()
export class tbl_subdisciplineCreateManyInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:false})
    disciplineID!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Int, {nullable:true})
    maxPerformers?: number;

    @Field(() => Int, {nullable:true})
    minPerformers?: number;

    @Field(() => tbl_subdiscipline_SGSlabel, {nullable:false})
    SGSlabel!: keyof typeof tbl_subdiscipline_SGSlabel;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    price?: Decimal;
}
