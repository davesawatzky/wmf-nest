import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { BoolFilter } from '../prisma/bool-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'
import { Tbl_registrationListRelationFilter } from '../prisma/tbl-registration-list-relation-filter.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_userWhereInput {
  @Field(() => [tbl_userWhereInput], { nullable: true })
  AND?: Array<tbl_userWhereInput>

  @Field(() => [tbl_userWhereInput], { nullable: true })
  OR?: Array<tbl_userWhereInput>

  @Field(() => [tbl_userWhereInput], { nullable: true })
  NOT?: Array<tbl_userWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter

  @Field(() => StringFilter, { nullable: true })
  password?: StringFilter

  @Field(() => BoolFilter, { nullable: true })
  staff?: BoolFilter

  @Field(() => BoolFilter, { nullable: true })
  admin?: BoolFilter

  @Field(() => StringNullableFilter, { nullable: true })
  firstName?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  lastName?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  apartment?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  streetNumber?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  streetName?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  city?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  province?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  postalCode?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  phone?: StringNullableFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => Tbl_registrationListRelationFilter, { nullable: true })
  @Type(() => Tbl_registrationListRelationFilter)
  tbl_registration?: Tbl_registrationListRelationFilter
}
