import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_reg_schoolScalarWhereWithAggregatesInput {
  @Field(() => [tbl_reg_schoolScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: Array<tbl_reg_schoolScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_schoolScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: Array<tbl_reg_schoolScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_schoolScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: Array<tbl_reg_schoolScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  regID?: IntWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  name?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  division?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  streetNumber?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  streetName?: StringNullableWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  city?: StringWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  province?: StringWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  postalCode?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  phone?: StringNullableWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter
}
