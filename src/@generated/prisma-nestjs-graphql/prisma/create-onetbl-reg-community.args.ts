import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_communityCreateInput } from '../tbl-reg-community/tbl-reg-community-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblRegCommunityArgs {
  @Field(() => tbl_reg_communityCreateInput, { nullable: false })
  @Type(() => tbl_reg_communityCreateInput)
  data!: tbl_reg_communityCreateInput
}
