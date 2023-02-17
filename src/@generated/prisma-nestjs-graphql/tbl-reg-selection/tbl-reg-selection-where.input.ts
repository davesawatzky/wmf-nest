import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { Tbl_reg_classesRelationFilter } from '../prisma/tbl-reg-classes-relation-filter.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_reg_selectionWhereInput {

    @Field(() => [tbl_reg_selectionWhereInput], {nullable:true})
    AND?: Array<tbl_reg_selectionWhereInput>;

    @Field(() => [tbl_reg_selectionWhereInput], {nullable:true})
    OR?: Array<tbl_reg_selectionWhereInput>;

    @Field(() => [tbl_reg_selectionWhereInput], {nullable:true})
    NOT?: Array<tbl_reg_selectionWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    classpickID?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    title?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    largerWork?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    movement?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    composer?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    duration?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => Tbl_reg_classesRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_classesRelationFilter)
    tbl_reg_classes?: Tbl_reg_classesRelationFilter;
}
