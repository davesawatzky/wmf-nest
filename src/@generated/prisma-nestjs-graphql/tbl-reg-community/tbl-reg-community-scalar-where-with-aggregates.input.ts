import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_reg_communityScalarWhereWithAggregatesInput {
  @Field(() => [tbl_reg_communityScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: Array<tbl_reg_communityScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_communityScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: Array<tbl_reg_communityScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_communityScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: Array<tbl_reg_communityScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  regID?: IntWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  name?: StringNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  groupSize?: IntNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  chaperones?: IntNullableWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  wheelchairs?: IntNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  earliestTime?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  latestTime?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  unavailable?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  conflictPerformers?: StringNullableWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter
}
