import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_SGS } from '../prisma/tbl-sgs.enum';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Decimal } from '@prisma/client/runtime';
import { tbl_category } from '../tbl-category/tbl-category.model';
import { tbl_level } from '../tbl-level/tbl-level.model';
import { tbl_subdiscipline } from '../tbl-subdiscipline/tbl-subdiscipline.model';
import { tbl_class_trophy } from '../tbl-class-trophy/tbl-class-trophy.model';
import { Tbl_classlistCount } from '../prisma/tbl-classlist-count.output';

@ObjectType()
export class tbl_classlist {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    classNumber!: string;

    @Field(() => Int, {nullable:false})
    subdisciplineID!: number;

    @Field(() => Int, {nullable:false})
    categoryID!: number;

    @Field(() => Int, {nullable:false})
    levelID!: number;

    @Field(() => Int, {nullable:false})
    minSelection!: number;

    @Field(() => Int, {nullable:false})
    maxSelection!: number;

    @Field(() => String, {nullable:true})
    requiredSelection!: string | null;

    @Field(() => tbl_SGS, {nullable:false,defaultValue:'SOLO'})
    SGSlabel!: keyof typeof tbl_SGS;

    @Field(() => GraphQLDecimal, {nullable:true})
    price!: Decimal | null;

    @Field(() => tbl_category, {nullable:false})
    tbl_category?: tbl_category;

    @Field(() => tbl_level, {nullable:false})
    tbl_level?: tbl_level;

    @Field(() => tbl_subdiscipline, {nullable:false})
    tbl_subdiscipline?: tbl_subdiscipline;

    @Field(() => [tbl_class_trophy], {nullable:true})
    tbl_class_trophy?: Array<tbl_class_trophy>;

    @Field(() => Tbl_classlistCount, {nullable:false})
    _count?: Tbl_classlistCount;
}
