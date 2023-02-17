import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_SGS } from '../prisma/tbl-sgs.enum';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { tbl_levelCreateNestedOneWithoutTbl_classlistInput } from '../tbl-level/tbl-level-create-nested-one-without-tbl-classlist.input';
import { tbl_subdisciplineCreateNestedOneWithoutTbl_classlistInput } from '../tbl-subdiscipline/tbl-subdiscipline-create-nested-one-without-tbl-classlist.input';
import { tbl_class_trophyCreateNestedManyWithoutTbl_classlistInput } from '../tbl-class-trophy/tbl-class-trophy-create-nested-many-without-tbl-classlist.input';

@InputType()
export class tbl_classlistCreateWithoutTbl_categoryInput {

    @Field(() => String, {nullable:false})
    classNumber!: string;

    @Field(() => Int, {nullable:false})
    minSelection!: number;

    @Field(() => Int, {nullable:false})
    maxSelection!: number;

    @Field(() => String, {nullable:true})
    requiredSelection?: string;

    @Field(() => tbl_SGS, {nullable:true})
    SGSlabel?: keyof typeof tbl_SGS;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    price?: Decimal;

    @Field(() => tbl_levelCreateNestedOneWithoutTbl_classlistInput, {nullable:false})
    @Type(() => tbl_levelCreateNestedOneWithoutTbl_classlistInput)
    tbl_level!: tbl_levelCreateNestedOneWithoutTbl_classlistInput;

    @Field(() => tbl_subdisciplineCreateNestedOneWithoutTbl_classlistInput, {nullable:false})
    @Type(() => tbl_subdisciplineCreateNestedOneWithoutTbl_classlistInput)
    tbl_subdiscipline!: tbl_subdisciplineCreateNestedOneWithoutTbl_classlistInput;

    @Field(() => tbl_class_trophyCreateNestedManyWithoutTbl_classlistInput, {nullable:true})
    @Type(() => tbl_class_trophyCreateNestedManyWithoutTbl_classlistInput)
    tbl_class_trophy?: tbl_class_trophyCreateNestedManyWithoutTbl_classlistInput;
}
