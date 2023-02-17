import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_subdiscipline_SGSlabel } from '../prisma/tbl-subdiscipline-sg-slabel.enum';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Decimal } from '@prisma/client/runtime';
import { tbl_discipline } from '../tbl-discipline/tbl-discipline.model';
import { tbl_classlist } from '../tbl-classlist/tbl-classlist.model';
import { Tbl_subdisciplineCount } from '../prisma/tbl-subdiscipline-count.output';

@ObjectType()
export class tbl_subdiscipline {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    disciplineID!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => Int, {nullable:true})
    maxPerformers!: number | null;

    @Field(() => Int, {nullable:true})
    minPerformers!: number | null;

    @Field(() => tbl_subdiscipline_SGSlabel, {nullable:false})
    SGSlabel!: keyof typeof tbl_subdiscipline_SGSlabel;

    @Field(() => GraphQLDecimal, {nullable:true})
    price!: Decimal | null;

    @Field(() => tbl_discipline, {nullable:false})
    tbl_discipline?: tbl_discipline;

    @Field(() => [tbl_classlist], {nullable:true})
    tbl_classlist?: Array<tbl_classlist>;

    @Field(() => Tbl_subdisciplineCount, {nullable:false})
    _count?: Tbl_subdisciplineCount;
}
