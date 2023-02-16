import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_communityUpdateInput } from '../tbl-reg-community/tbl-reg-community-update.input'
import { Type } from 'class-transformer'
import { tbl_reg_communityWhereUniqueInput } from '../tbl-reg-community/tbl-reg-community-where-unique.input'

@ArgsType()
export class UpdateOnetblRegCommunityArgs {
  @Field(() => tbl_reg_communityUpdateInput, { nullable: false })
  @Type(() => tbl_reg_communityUpdateInput)
  data!: tbl_reg_communityUpdateInput

  @Field(() => tbl_reg_communityWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  where!: tbl_reg_communityWhereUniqueInput
}
