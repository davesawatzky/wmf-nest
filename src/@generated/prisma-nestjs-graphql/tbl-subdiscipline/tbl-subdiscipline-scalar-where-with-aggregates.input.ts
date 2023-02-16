import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input'
import { Enumtbl_subdiscipline_SGSlabelWithAggregatesFilter } from '../prisma/enumtbl-subdiscipline-sg-slabel-with-aggregates-filter.input'
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input'

@InputType()
export class tbl_subdisciplineScalarWhereWithAggregatesInput {
  @Field(() => [tbl_subdisciplineScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineScalarWhereWithAggregatesInput)
  AND?: Array<tbl_subdisciplineScalarWhereWithAggregatesInput>

  @Field(() => [tbl_subdisciplineScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineScalarWhereWithAggregatesInput)
  OR?: Array<tbl_subdisciplineScalarWhereWithAggregatesInput>

  @Field(() => [tbl_subdisciplineScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineScalarWhereWithAggregatesInput)
  NOT?: Array<tbl_subdisciplineScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  disciplineID?: IntWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  description?: StringNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  maxPerformers?: IntNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  minPerformers?: IntNullableWithAggregatesFilter

  @Field(() => Enumtbl_subdiscipline_SGSlabelWithAggregatesFilter, {
    nullable: true,
  })
  SGSlabel?: Enumtbl_subdiscipline_SGSlabelWithAggregatesFilter

  @Field(() => DecimalNullableWithAggregatesFilter, { nullable: true })
  @Type(() => DecimalNullableWithAggregatesFilter)
  price?: DecimalNullableWithAggregatesFilter
}
