import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { Tbl_classlistListRelationFilter } from '../prisma/tbl-classlist-list-relation-filter.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_categoryWhereInput {

    @Field(() => [tbl_categoryWhereInput], {nullable:true})
    AND?: Array<tbl_categoryWhereInput>;

    @Field(() => [tbl_categoryWhereInput], {nullable:true})
    OR?: Array<tbl_categoryWhereInput>;

    @Field(() => [tbl_categoryWhereInput], {nullable:true})
    NOT?: Array<tbl_categoryWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    requiredComposer?: StringNullableFilter;

    @Field(() => Tbl_classlistListRelationFilter, {nullable:true})
    @Type(() => Tbl_classlistListRelationFilter)
    tbl_classlist?: Tbl_classlistListRelationFilter;
}
