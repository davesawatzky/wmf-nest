import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { IntNullableFilter } from '../prisma/int-nullable-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'

@InputType()
export class tbl_reg_performerScalarWhereInput {
  @Field(() => [tbl_reg_performerScalarWhereInput], { nullable: true })
  AND?: Array<tbl_reg_performerScalarWhereInput>

  @Field(() => [tbl_reg_performerScalarWhereInput], { nullable: true })
  OR?: Array<tbl_reg_performerScalarWhereInput>

  @Field(() => [tbl_reg_performerScalarWhereInput], { nullable: true })
  NOT?: Array<tbl_reg_performerScalarWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  regID?: IntFilter

  @Field(() => StringNullableFilter, { nullable: true })
  lastName?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  firstName?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  apartment?: StringNullableFilter

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

  @Field(() => StringNullableFilter, { nullable: true })
  email?: StringNullableFilter

  @Field(() => IntNullableFilter, { nullable: true })
  age?: IntNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  instrument?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  level?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  otherClasses?: StringNullableFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter
}
