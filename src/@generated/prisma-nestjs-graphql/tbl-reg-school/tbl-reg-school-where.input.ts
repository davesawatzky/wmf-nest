import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'
import { Tbl_registrationRelationFilter } from '../prisma/tbl-registration-relation-filter.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_schoolWhereInput {
  @Field(() => [tbl_reg_schoolWhereInput], { nullable: true })
  AND?: Array<tbl_reg_schoolWhereInput>

  @Field(() => [tbl_reg_schoolWhereInput], { nullable: true })
  OR?: Array<tbl_reg_schoolWhereInput>

  @Field(() => [tbl_reg_schoolWhereInput], { nullable: true })
  NOT?: Array<tbl_reg_schoolWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  regID?: IntFilter

  @Field(() => StringNullableFilter, { nullable: true })
  name?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  division?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  streetNumber?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  streetName?: StringNullableFilter

  @Field(() => StringFilter, { nullable: true })
  city?: StringFilter

  @Field(() => StringFilter, { nullable: true })
  province?: StringFilter

  @Field(() => StringNullableFilter, { nullable: true })
  postalCode?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  phone?: StringNullableFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter

  @Field(() => Tbl_registrationRelationFilter, { nullable: true })
  @Type(() => Tbl_registrationRelationFilter)
  tbl_registration?: Tbl_registrationRelationFilter
}
