import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_communityCreateManyInput } from '../tbl-reg-community/tbl-reg-community-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblRegCommunityArgs {
  @Field(() => [tbl_reg_communityCreateManyInput], { nullable: false })
  @Type(() => tbl_reg_communityCreateManyInput)
  data!: Array<tbl_reg_communityCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
