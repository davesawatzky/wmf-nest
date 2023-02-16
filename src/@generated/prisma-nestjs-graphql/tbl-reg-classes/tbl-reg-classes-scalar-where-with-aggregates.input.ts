import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input'
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_reg_classesScalarWhereWithAggregatesInput {
  @Field(() => [tbl_reg_classesScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_classesScalarWhereWithAggregatesInput)
  AND?: Array<tbl_reg_classesScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_classesScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_classesScalarWhereWithAggregatesInput)
  OR?: Array<tbl_reg_classesScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_classesScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_classesScalarWhereWithAggregatesInput)
  NOT?: Array<tbl_reg_classesScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  regID?: IntWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  classNumber?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  discipline?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  subdiscipline?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  level?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  category?: StringNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  numberOfSelections?: IntNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  schoolCommunityId?: IntNullableWithAggregatesFilter

  @Field(() => DecimalNullableWithAggregatesFilter, { nullable: true })
  @Type(() => DecimalNullableWithAggregatesFilter)
  price?: DecimalNullableWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter
}
