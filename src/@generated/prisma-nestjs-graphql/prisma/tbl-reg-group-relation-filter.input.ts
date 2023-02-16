import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_groupWhereInput } from '../tbl-reg-group/tbl-reg-group-where.input'

@InputType()
export class Tbl_reg_groupRelationFilter {
  @Field(() => tbl_reg_groupWhereInput, { nullable: true })
  is?: tbl_reg_groupWhereInput

  @Field(() => tbl_reg_groupWhereInput, { nullable: true })
  isNot?: tbl_reg_groupWhereInput
}
