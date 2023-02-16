import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationUpdateWithoutTbl_reg_groupInput } from './tbl-registration-update-without-tbl-reg-group.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateWithoutTbl_reg_groupInput } from './tbl-registration-create-without-tbl-reg-group.input'

@InputType()
export class tbl_registrationUpsertWithoutTbl_reg_groupInput {
  @Field(() => tbl_registrationUpdateWithoutTbl_reg_groupInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationUpdateWithoutTbl_reg_groupInput)
  update!: tbl_registrationUpdateWithoutTbl_reg_groupInput

  @Field(() => tbl_registrationCreateWithoutTbl_reg_groupInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_groupInput)
  create!: tbl_registrationCreateWithoutTbl_reg_groupInput
}
