import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';

@InputType()
export class tbl_trophyScalarWhereWithAggregatesInput {

    @Field(() => [tbl_trophyScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<tbl_trophyScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_trophyScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<tbl_trophyScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_trophyScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<tbl_trophyScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;
}
