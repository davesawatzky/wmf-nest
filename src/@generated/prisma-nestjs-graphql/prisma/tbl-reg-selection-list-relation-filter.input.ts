import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_selectionWhereInput } from '../tbl-reg-selection/tbl-reg-selection-where.input'

@InputType()
export class Tbl_reg_selectionListRelationFilter {
  @Field(() => tbl_reg_selectionWhereInput, { nullable: true })
  every?: tbl_reg_selectionWhereInput

  @Field(() => tbl_reg_selectionWhereInput, { nullable: true })
  some?: tbl_reg_selectionWhereInput

  @Field(() => tbl_reg_selectionWhereInput, { nullable: true })
  none?: tbl_reg_selectionWhereInput
}
