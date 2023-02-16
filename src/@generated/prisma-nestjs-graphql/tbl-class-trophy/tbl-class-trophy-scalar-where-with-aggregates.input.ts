import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'

@InputType()
export class tbl_class_trophyScalarWhereWithAggregatesInput {
  @Field(() => [tbl_class_trophyScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: Array<tbl_class_trophyScalarWhereWithAggregatesInput>

  @Field(() => [tbl_class_trophyScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: Array<tbl_class_trophyScalarWhereWithAggregatesInput>

  @Field(() => [tbl_class_trophyScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: Array<tbl_class_trophyScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  classID?: IntWithAggregatesFilter

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  trophyID?: IntWithAggregatesFilter
}
