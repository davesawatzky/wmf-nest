import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';

@InputType()
export class tbl_levelScalarWhereWithAggregatesInput {

    @Field(() => [tbl_levelScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<tbl_levelScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_levelScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<tbl_levelScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_levelScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<tbl_levelScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    order?: IntNullableWithAggregatesFilter;
}
