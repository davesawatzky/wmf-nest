import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { Enumtbl_SGSWithAggregatesFilter } from '../prisma/enumtbl-sgs-with-aggregates-filter.input';
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input';

@InputType()
export class tbl_classlistScalarWhereWithAggregatesInput {

    @Field(() => [tbl_classlistScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => tbl_classlistScalarWhereWithAggregatesInput)
    AND?: Array<tbl_classlistScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_classlistScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => tbl_classlistScalarWhereWithAggregatesInput)
    OR?: Array<tbl_classlistScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_classlistScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => tbl_classlistScalarWhereWithAggregatesInput)
    NOT?: Array<tbl_classlistScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    classNumber?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    subdisciplineID?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    categoryID?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    levelID?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    minSelection?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    maxSelection?: IntWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    requiredSelection?: StringNullableWithAggregatesFilter;

    @Field(() => Enumtbl_SGSWithAggregatesFilter, {nullable:true})
    SGSlabel?: Enumtbl_SGSWithAggregatesFilter;

    @Field(() => DecimalNullableWithAggregatesFilter, {nullable:true})
    @Type(() => DecimalNullableWithAggregatesFilter)
    price?: DecimalNullableWithAggregatesFilter;
}
