import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_unavailableUpdateManyMutationInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_reg_unavailableWhereInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where.input'

@ArgsType()
export class UpdateManytblRegUnavailableArgs {
  @Field(() => tbl_reg_unavailableUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_reg_unavailableUpdateManyMutationInput)
  data!: tbl_reg_unavailableUpdateManyMutationInput

  @Field(() => tbl_reg_unavailableWhereInput, { nullable: true })
  @Type(() => tbl_reg_unavailableWhereInput)
  where?: tbl_reg_unavailableWhereInput
}
