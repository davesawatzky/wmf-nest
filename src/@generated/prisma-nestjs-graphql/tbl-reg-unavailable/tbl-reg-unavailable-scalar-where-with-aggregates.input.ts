import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_reg_unavailableScalarWhereWithAggregatesInput {
  @Field(() => [tbl_reg_unavailableScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: Array<tbl_reg_unavailableScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_unavailableScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: Array<tbl_reg_unavailableScalarWhereWithAggregatesInput>

  @Field(() => [tbl_reg_unavailableScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: Array<tbl_reg_unavailableScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  groupID?: IntWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  date?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  time?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter
}
