import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_groupUpdateInput } from '../tbl-reg-group/tbl-reg-group-update.input'
import { Type } from 'class-transformer'
import { tbl_reg_groupWhereUniqueInput } from '../tbl-reg-group/tbl-reg-group-where-unique.input'

@ArgsType()
export class UpdateOnetblRegGroupArgs {
  @Field(() => tbl_reg_groupUpdateInput, { nullable: false })
  @Type(() => tbl_reg_groupUpdateInput)
  data!: tbl_reg_groupUpdateInput

  @Field(() => tbl_reg_groupWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  where!: tbl_reg_groupWhereUniqueInput
}
