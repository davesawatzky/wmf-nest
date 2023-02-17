import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { Tbl_registrationRelationFilter } from '../prisma/tbl-registration-relation-filter.input';
import { Tbl_reg_selectionListRelationFilter } from '../prisma/tbl-reg-selection-list-relation-filter.input';

@InputType()
export class tbl_reg_classesWhereInput {

    @Field(() => [tbl_reg_classesWhereInput], {nullable:true})
    @Type(() => tbl_reg_classesWhereInput)
    AND?: Array<tbl_reg_classesWhereInput>;

    @Field(() => [tbl_reg_classesWhereInput], {nullable:true})
    @Type(() => tbl_reg_classesWhereInput)
    OR?: Array<tbl_reg_classesWhereInput>;

    @Field(() => [tbl_reg_classesWhereInput], {nullable:true})
    @Type(() => tbl_reg_classesWhereInput)
    NOT?: Array<tbl_reg_classesWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    regID?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    classNumber?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    discipline?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    subdiscipline?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    level?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    category?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    numberOfSelections?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    schoolCommunityId?: IntNullableFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    price?: DecimalNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => Tbl_registrationRelationFilter, {nullable:true})
    @Type(() => Tbl_registrationRelationFilter)
    tbl_registration?: Tbl_registrationRelationFilter;

    @Field(() => Tbl_reg_selectionListRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_selectionListRelationFilter)
    tbl_reg_selection?: Tbl_reg_selectionListRelationFilter;
}
