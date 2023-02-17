import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_subdiscipline_SGSlabel } from '../prisma/tbl-subdiscipline-sg-slabel.enum';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { tbl_classlistUncheckedCreateNestedManyWithoutTbl_subdisciplineInput } from '../tbl-classlist/tbl-classlist-unchecked-create-nested-many-without-tbl-subdiscipline.input';

@InputType()
export class tbl_subdisciplineUncheckedCreateInput {

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

    @Field(() => tbl_classlistUncheckedCreateNestedManyWithoutTbl_subdisciplineInput, {nullable:true})
    @Type(() => tbl_classlistUncheckedCreateNestedManyWithoutTbl_subdisciplineInput)
    tbl_classlist?: tbl_classlistUncheckedCreateNestedManyWithoutTbl_subdisciplineInput;
}
