import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_categoryWhereInput } from '../tbl-category/tbl-category-where.input'

@InputType()
export class Tbl_categoryRelationFilter {
  @Field(() => tbl_categoryWhereInput, { nullable: true })
  is?: tbl_categoryWhereInput

  @Field(() => tbl_categoryWhereInput, { nullable: true })
  isNot?: tbl_categoryWhereInput
}
