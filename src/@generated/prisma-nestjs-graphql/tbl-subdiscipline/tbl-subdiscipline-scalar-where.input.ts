import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { Enumtbl_subdiscipline_SGSlabelFilter } from '../prisma/enumtbl-subdiscipline-sg-slabel-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';

@InputType()
export class tbl_subdisciplineScalarWhereInput {

    @Field(() => [tbl_subdisciplineScalarWhereInput], {nullable:true})
    @Type(() => tbl_subdisciplineScalarWhereInput)
    AND?: Array<tbl_subdisciplineScalarWhereInput>;

    @Field(() => [tbl_subdisciplineScalarWhereInput], {nullable:true})
    @Type(() => tbl_subdisciplineScalarWhereInput)
    OR?: Array<tbl_subdisciplineScalarWhereInput>;

    @Field(() => [tbl_subdisciplineScalarWhereInput], {nullable:true})
    @Type(() => tbl_subdisciplineScalarWhereInput)
    NOT?: Array<tbl_subdisciplineScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    disciplineID?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    maxPerformers?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    minPerformers?: IntNullableFilter;

    @Field(() => Enumtbl_subdiscipline_SGSlabelFilter, {nullable:true})
    SGSlabel?: Enumtbl_subdiscipline_SGSlabelFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    price?: DecimalNullableFilter;
}
