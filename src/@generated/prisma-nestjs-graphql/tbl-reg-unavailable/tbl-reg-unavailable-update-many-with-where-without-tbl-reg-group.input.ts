import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_unavailableScalarWhereInput } from './tbl-reg-unavailable-scalar-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_unavailableUpdateManyMutationInput } from './tbl-reg-unavailable-update-many-mutation.input'

@InputType()
export class tbl_reg_unavailableUpdateManyWithWhereWithoutTbl_reg_groupInput {
  @Field(() => tbl_reg_unavailableScalarWhereInput, { nullable: false })
  @Type(() => tbl_reg_unavailableScalarWhereInput)
  where!: tbl_reg_unavailableScalarWhereInput

  @Field(() => tbl_reg_unavailableUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_reg_unavailableUpdateManyMutationInput)
  data!: tbl_reg_unavailableUpdateManyMutationInput
}
