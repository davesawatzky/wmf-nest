import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput } from './tbl-reg-group-update-without-tbl-reg-unavailable.input'
import { Type } from 'class-transformer'
import { tbl_reg_groupCreateWithoutTbl_reg_unavailableInput } from './tbl-reg-group-create-without-tbl-reg-unavailable.input'

@InputType()
export class tbl_reg_groupUpsertWithoutTbl_reg_unavailableInput {
  @Field(() => tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput)
  update!: tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput

  @Field(() => tbl_reg_groupCreateWithoutTbl_reg_unavailableInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_groupCreateWithoutTbl_reg_unavailableInput)
  create!: tbl_reg_groupCreateWithoutTbl_reg_unavailableInput
}
