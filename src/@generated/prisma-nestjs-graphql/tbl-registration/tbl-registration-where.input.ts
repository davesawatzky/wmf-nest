import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { Enumtbl_registration_performerTypeFilter } from '../prisma/enumtbl-registration-performer-type-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { Tbl_userRelationFilter } from '../prisma/tbl-user-relation-filter.input';
import { Tbl_reg_classesListRelationFilter } from '../prisma/tbl-reg-classes-list-relation-filter.input';
import { Tbl_reg_communityListRelationFilter } from '../prisma/tbl-reg-community-list-relation-filter.input';
import { Tbl_reg_groupListRelationFilter } from '../prisma/tbl-reg-group-list-relation-filter.input';
import { Tbl_reg_performerListRelationFilter } from '../prisma/tbl-reg-performer-list-relation-filter.input';
import { Tbl_reg_schoolRelationFilter } from '../prisma/tbl-reg-school-relation-filter.input';
import { Tbl_reg_teacherRelationFilter } from '../prisma/tbl-reg-teacher-relation-filter.input';

@InputType()
export class tbl_registrationWhereInput {

    @Field(() => [tbl_registrationWhereInput], {nullable:true})
    @Type(() => tbl_registrationWhereInput)
    AND?: Array<tbl_registrationWhereInput>;

    @Field(() => [tbl_registrationWhereInput], {nullable:true})
    @Type(() => tbl_registrationWhereInput)
    OR?: Array<tbl_registrationWhereInput>;

    @Field(() => [tbl_registrationWhereInput], {nullable:true})
    @Type(() => tbl_registrationWhereInput)
    NOT?: Array<tbl_registrationWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    userID?: IntNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    label?: StringFilter;

    @Field(() => Enumtbl_registration_performerTypeFilter, {nullable:true})
    performerType?: Enumtbl_registration_performerTypeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    submittedAt?: DateTimeNullableFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    totalAmt?: DecimalNullableFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    payedAmt?: DecimalNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    transactionInfo?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    confirmation?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => Tbl_userRelationFilter, {nullable:true})
    @Type(() => Tbl_userRelationFilter)
    tbl_user?: Tbl_userRelationFilter;

    @Field(() => Tbl_reg_classesListRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_classesListRelationFilter)
    tbl_reg_classes?: Tbl_reg_classesListRelationFilter;

    @Field(() => Tbl_reg_communityListRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_communityListRelationFilter)
    tbl_reg_community?: Tbl_reg_communityListRelationFilter;

    @Field(() => Tbl_reg_groupListRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_groupListRelationFilter)
    tbl_reg_group?: Tbl_reg_groupListRelationFilter;

    @Field(() => Tbl_reg_performerListRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_performerListRelationFilter)
    tbl_reg_performer?: Tbl_reg_performerListRelationFilter;

    @Field(() => Tbl_reg_schoolRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_schoolRelationFilter)
    tbl_reg_school?: Tbl_reg_schoolRelationFilter;

    @Field(() => Tbl_reg_teacherRelationFilter, {nullable:true})
    @Type(() => Tbl_reg_teacherRelationFilter)
    tbl_reg_teacher?: Tbl_reg_teacherRelationFilter;
}
