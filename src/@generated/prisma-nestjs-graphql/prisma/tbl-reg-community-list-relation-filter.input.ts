import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_communityWhereInput } from '../tbl-reg-community/tbl-reg-community-where.input'

@InputType()
export class Tbl_reg_communityListRelationFilter {
  @Field(() => tbl_reg_communityWhereInput, { nullable: true })
  every?: tbl_reg_communityWhereInput

  @Field(() => tbl_reg_communityWhereInput, { nullable: true })
  some?: tbl_reg_communityWhereInput

  @Field(() => tbl_reg_communityWhereInput, { nullable: true })
  none?: tbl_reg_communityWhereInput
}
