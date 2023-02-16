import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_subdiscipline_SGSlabel } from './tbl-subdiscipline-sg-slabel.enum'

@InputType()
export class NestedEnumtbl_subdiscipline_SGSlabelFilter {
  @Field(() => tbl_subdiscipline_SGSlabel, { nullable: true })
  equals?: keyof typeof tbl_subdiscipline_SGSlabel;

  @Field(() => [tbl_subdiscipline_SGSlabel], { nullable: true })
  in?: Array<keyof typeof tbl_subdiscipline_SGSlabel>

  @Field(() => [tbl_subdiscipline_SGSlabel], { nullable: true })
  notIn?: Array<keyof typeof tbl_subdiscipline_SGSlabel>

  @Field(() => NestedEnumtbl_subdiscipline_SGSlabelFilter, { nullable: true })
  not?: NestedEnumtbl_subdiscipline_SGSlabelFilter
}
