import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_communityWhereUniqueInput } from '../tbl-reg-community/tbl-reg-community-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_communityCreateInput } from '../tbl-reg-community/tbl-reg-community-create.input'
import { tbl_reg_communityUpdateInput } from '../tbl-reg-community/tbl-reg-community-update.input'

@ArgsType()
export class UpsertOnetblRegCommunityArgs {
  @Field(() => tbl_reg_communityWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  where!: tbl_reg_communityWhereUniqueInput

  @Field(() => tbl_reg_communityCreateInput, { nullable: false })
  @Type(() => tbl_reg_communityCreateInput)
  create!: tbl_reg_communityCreateInput

  @Field(() => tbl_reg_communityUpdateInput, { nullable: false })
  @Type(() => tbl_reg_communityUpdateInput)
  update!: tbl_reg_communityUpdateInput
}
