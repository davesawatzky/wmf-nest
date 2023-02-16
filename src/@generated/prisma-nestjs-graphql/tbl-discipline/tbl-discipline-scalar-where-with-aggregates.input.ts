import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'

@InputType()
export class tbl_disciplineScalarWhereWithAggregatesInput {
  @Field(() => [tbl_disciplineScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: Array<tbl_disciplineScalarWhereWithAggregatesInput>

  @Field(() => [tbl_disciplineScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: Array<tbl_disciplineScalarWhereWithAggregatesInput>

  @Field(() => [tbl_disciplineScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: Array<tbl_disciplineScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter
}
