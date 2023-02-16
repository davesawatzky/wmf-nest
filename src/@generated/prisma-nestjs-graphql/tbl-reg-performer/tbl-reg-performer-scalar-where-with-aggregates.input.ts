import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_reg_performerScalarWhereWithAggregatesInput {
  @Field(() => [tbl_reg_performerScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: Array<tbl_reg_performerScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_performerScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: Array<tbl_reg_performerScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_performerScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: Array<tbl_reg_performerScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  regID?: IntWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  lastName?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  firstName?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  apartment?: StringNullableWithAggregatesFilter

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

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  email?: StringNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  age?: IntNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  instrument?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  level?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  otherClasses?: StringNullableWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter
}
