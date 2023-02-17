import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { Tbl_registrationRelationFilter } from '../prisma/tbl-registration-relation-filter.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_reg_communityWhereInput {

    @Field(() => [tbl_reg_communityWhereInput], {nullable:true})
    AND?: Array<tbl_reg_communityWhereInput>;

    @Field(() => [tbl_reg_communityWhereInput], {nullable:true})
    OR?: Array<tbl_reg_communityWhereInput>;

    @Field(() => [tbl_reg_communityWhereInput], {nullable:true})
    NOT?: Array<tbl_reg_communityWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    regID?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    name?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    groupSize?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    chaperones?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    wheelchairs?: IntNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    earliestTime?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    latestTime?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    unavailable?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    conflictPerformers?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => Tbl_registrationRelationFilter, {nullable:true})
    @Type(() => Tbl_registrationRelationFilter)
    tbl_registration?: Tbl_registrationRelationFilter;
}
