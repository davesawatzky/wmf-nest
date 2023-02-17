import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { Tbl_classlistListRelationFilter } from '../prisma/tbl-classlist-list-relation-filter.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_levelWhereInput {

    @Field(() => [tbl_levelWhereInput], {nullable:true})
    AND?: Array<tbl_levelWhereInput>;

    @Field(() => [tbl_levelWhereInput], {nullable:true})
    OR?: Array<tbl_levelWhereInput>;

    @Field(() => [tbl_levelWhereInput], {nullable:true})
    NOT?: Array<tbl_levelWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    order?: IntNullableFilter;

    @Field(() => Tbl_classlistListRelationFilter, {nullable:true})
    @Type(() => Tbl_classlistListRelationFilter)
    tbl_classlist?: Tbl_classlistListRelationFilter;
}
