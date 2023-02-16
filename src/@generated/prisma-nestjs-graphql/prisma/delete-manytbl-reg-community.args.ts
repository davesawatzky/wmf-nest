import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_communityWhereInput } from '../tbl-reg-community/tbl-reg-community-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManytblRegCommunityArgs {
  @Field(() => tbl_reg_communityWhereInput, { nullable: true })
  @Type(() => tbl_reg_communityWhereInput)
  where?: tbl_reg_communityWhereInput
}
