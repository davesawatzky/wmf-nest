import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_SGS } from './tbl-sgs.enum'
import { NestedEnumtbl_SGSWithAggregatesFilter } from './nested-enumtbl-sgs-with-aggregates-filter.input'
import { NestedIntFilter } from './nested-int-filter.input'
import { NestedEnumtbl_SGSFilter } from './nested-enumtbl-sgs-filter.input'

@InputType()
export class Enumtbl_SGSWithAggregatesFilter {
  @Field(() => tbl_SGS, { nullable: true })
  equals?: keyof typeof tbl_SGS;

  @Field(() => [tbl_SGS], { nullable: true })
  in?: Array<keyof typeof tbl_SGS>

  @Field(() => [tbl_SGS], { nullable: true })
  notIn?: Array<keyof typeof tbl_SGS>

  @Field(() => NestedEnumtbl_SGSWithAggregatesFilter, { nullable: true })
  not?: NestedEnumtbl_SGSWithAggregatesFilter

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter

  @Field(() => NestedEnumtbl_SGSFilter, { nullable: true })
  _min?: NestedEnumtbl_SGSFilter

  @Field(() => NestedEnumtbl_SGSFilter, { nullable: true })
  _max?: NestedEnumtbl_SGSFilter
}
