import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_subdiscipline_SGSlabel } from './tbl-subdiscipline-sg-slabel.enum'
import { NestedEnumtbl_subdiscipline_SGSlabelWithAggregatesFilter } from './nested-enumtbl-subdiscipline-sg-slabel-with-aggregates-filter.input'
import { NestedIntFilter } from './nested-int-filter.input'
import { NestedEnumtbl_subdiscipline_SGSlabelFilter } from './nested-enumtbl-subdiscipline-sg-slabel-filter.input'

@InputType()
export class Enumtbl_subdiscipline_SGSlabelWithAggregatesFilter {
  @Field(() => tbl_subdiscipline_SGSlabel, { nullable: true })
  equals?: keyof typeof tbl_subdiscipline_SGSlabel;

  @Field(() => [tbl_subdiscipline_SGSlabel], { nullable: true })
  in?: Array<keyof typeof tbl_subdiscipline_SGSlabel>

  @Field(() => [tbl_subdiscipline_SGSlabel], { nullable: true })
  notIn?: Array<keyof typeof tbl_subdiscipline_SGSlabel>

  @Field(() => NestedEnumtbl_subdiscipline_SGSlabelWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumtbl_subdiscipline_SGSlabelWithAggregatesFilter

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter

  @Field(() => NestedEnumtbl_subdiscipline_SGSlabelFilter, { nullable: true })
  _min?: NestedEnumtbl_subdiscipline_SGSlabelFilter

  @Field(() => NestedEnumtbl_subdiscipline_SGSlabelFilter, { nullable: true })
  _max?: NestedEnumtbl_subdiscipline_SGSlabelFilter
}
