import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_unavailableCreateInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblRegUnavailableArgs {
  @Field(() => tbl_reg_unavailableCreateInput, { nullable: false })
  @Type(() => tbl_reg_unavailableCreateInput)
  data!: tbl_reg_unavailableCreateInput
}
