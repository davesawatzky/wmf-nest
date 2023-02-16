import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'

@InputType()
export class tbl_categoryScalarWhereWithAggregatesInput {
  @Field(() => [tbl_categoryScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<tbl_categoryScalarWhereWithAggregatesInput>

  @Field(() => [tbl_categoryScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<tbl_categoryScalarWhereWithAggregatesInput>

  @Field(() => [tbl_categoryScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<tbl_categoryScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  description?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  requiredComposer?: StringNullableWithAggregatesFilter
}
