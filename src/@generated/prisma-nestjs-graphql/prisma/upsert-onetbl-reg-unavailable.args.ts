import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_unavailableWhereUniqueInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_unavailableCreateInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-create.input'
import { tbl_reg_unavailableUpdateInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-update.input'

@ArgsType()
export class UpsertOnetblRegUnavailableArgs {
  @Field(() => tbl_reg_unavailableWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_unavailableWhereUniqueInput)
  where!: tbl_reg_unavailableWhereUniqueInput

  @Field(() => tbl_reg_unavailableCreateInput, { nullable: false })
  @Type(() => tbl_reg_unavailableCreateInput)
  create!: tbl_reg_unavailableCreateInput

  @Field(() => tbl_reg_unavailableUpdateInput, { nullable: false })
  @Type(() => tbl_reg_unavailableUpdateInput)
  update!: tbl_reg_unavailableUpdateInput
}
