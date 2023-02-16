import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { IntNullableFilter } from '../prisma/int-nullable-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'
import { Tbl_registrationRelationFilter } from '../prisma/tbl-registration-relation-filter.input'
import { Type } from 'class-transformer'
import { Tbl_reg_unavailableListRelationFilter } from '../prisma/tbl-reg-unavailable-list-relation-filter.input'

@InputType()
export class tbl_reg_groupWhereInput {
  @Field(() => [tbl_reg_groupWhereInput], { nullable: true })
  AND?: Array<tbl_reg_groupWhereInput>

  @Field(() => [tbl_reg_groupWhereInput], { nullable: true })
  OR?: Array<tbl_reg_groupWhereInput>

  @Field(() => [tbl_reg_groupWhereInput], { nullable: true })
  NOT?: Array<tbl_reg_groupWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  regID?: IntFilter

  @Field(() => StringNullableFilter, { nullable: true })
  name?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  groupType?: StringNullableFilter

  @Field(() => IntNullableFilter, { nullable: true })
  numberOfPerformers?: IntNullableFilter

  @Field(() => IntNullableFilter, { nullable: true })
  age?: IntNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  instruments?: StringNullableFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter

  @Field(() => Tbl_registrationRelationFilter, { nullable: true })
  @Type(() => Tbl_registrationRelationFilter)
  tbl_registration?: Tbl_registrationRelationFilter

  @Field(() => Tbl_reg_unavailableListRelationFilter, { nullable: true })
  tbl_reg_unavailable?: Tbl_reg_unavailableListRelationFilter
}
