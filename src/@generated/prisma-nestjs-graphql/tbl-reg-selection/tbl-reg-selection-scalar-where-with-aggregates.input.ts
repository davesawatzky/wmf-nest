import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_reg_selectionScalarWhereWithAggregatesInput {
  @Field(() => [tbl_reg_selectionScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: Array<tbl_reg_selectionScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_selectionScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: Array<tbl_reg_selectionScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_selectionScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: Array<tbl_reg_selectionScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  classpickID?: IntWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  title?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  largerWork?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  movement?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  composer?: StringNullableWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  duration?: StringWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter
}
