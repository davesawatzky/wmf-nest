import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class tbl_sacredScalarWhereWithAggregatesInput {

    @Field(() => [tbl_sacredScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<tbl_sacredScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_sacredScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<tbl_sacredScalarWhereWithAggregatesInput>;

    @Field(() => [tbl_sacredScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<tbl_sacredScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    composer?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    largeWork?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    title?: StringWithAggregatesFilter;
}
