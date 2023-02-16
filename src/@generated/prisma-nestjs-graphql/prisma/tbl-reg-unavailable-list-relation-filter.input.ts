import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_unavailableWhereInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where.input'

@InputType()
export class Tbl_reg_unavailableListRelationFilter {
  @Field(() => tbl_reg_unavailableWhereInput, { nullable: true })
  every?: tbl_reg_unavailableWhereInput

  @Field(() => tbl_reg_unavailableWhereInput, { nullable: true })
  some?: tbl_reg_unavailableWhereInput

  @Field(() => tbl_reg_unavailableWhereInput, { nullable: true })
  none?: tbl_reg_unavailableWhereInput
}
