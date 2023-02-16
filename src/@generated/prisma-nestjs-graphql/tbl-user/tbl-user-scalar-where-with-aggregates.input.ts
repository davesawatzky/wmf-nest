import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_userScalarWhereWithAggregatesInput {
  @Field(() => [tbl_userScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<tbl_userScalarWhereWithAggregatesInput>

  @Field(() => [tbl_userScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<tbl_userScalarWhereWithAggregatesInput>

  @Field(() => [tbl_userScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<tbl_userScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  email?: StringWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  password?: StringWithAggregatesFilter

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  staff?: BoolWithAggregatesFilter

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  admin?: BoolWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  firstName?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  lastName?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  apartment?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  streetNumber?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  streetName?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  city?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  province?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  postalCode?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  phone?: StringNullableWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter
}
