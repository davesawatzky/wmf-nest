import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_userWhereInput } from '../tbl-user/tbl-user-where.input'

@InputType()
export class Tbl_userRelationFilter {
  @Field(() => tbl_userWhereInput, { nullable: true })
  is?: tbl_userWhereInput

  @Field(() => tbl_userWhereInput, { nullable: true })
  isNot?: tbl_userWhereInput
}
