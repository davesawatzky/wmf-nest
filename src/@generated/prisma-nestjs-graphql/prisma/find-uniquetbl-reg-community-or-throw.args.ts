import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_communityWhereUniqueInput } from '../tbl-reg-community/tbl-reg-community-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquetblRegCommunityOrThrowArgs {
  @Field(() => tbl_reg_communityWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  where!: tbl_reg_communityWhereUniqueInput
}
