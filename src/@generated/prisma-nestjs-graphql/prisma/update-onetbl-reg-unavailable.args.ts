import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_unavailableUpdateInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-update.input'
import { Type } from 'class-transformer'
import { tbl_reg_unavailableWhereUniqueInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where-unique.input'

@ArgsType()
export class UpdateOnetblRegUnavailableArgs {
  @Field(() => tbl_reg_unavailableUpdateInput, { nullable: false })
  @Type(() => tbl_reg_unavailableUpdateInput)
  data!: tbl_reg_unavailableUpdateInput

  @Field(() => tbl_reg_unavailableWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_unavailableWhereUniqueInput)
  where!: tbl_reg_unavailableWhereUniqueInput
}
