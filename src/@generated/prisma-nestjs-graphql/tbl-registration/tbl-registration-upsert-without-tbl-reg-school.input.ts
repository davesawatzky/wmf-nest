import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationUpdateWithoutTbl_reg_schoolInput } from './tbl-registration-update-without-tbl-reg-school.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateWithoutTbl_reg_schoolInput } from './tbl-registration-create-without-tbl-reg-school.input'

@InputType()
export class tbl_registrationUpsertWithoutTbl_reg_schoolInput {
  @Field(() => tbl_registrationUpdateWithoutTbl_reg_schoolInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationUpdateWithoutTbl_reg_schoolInput)
  update!: tbl_registrationUpdateWithoutTbl_reg_schoolInput

  @Field(() => tbl_registrationCreateWithoutTbl_reg_schoolInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_schoolInput)
  create!: tbl_registrationCreateWithoutTbl_reg_schoolInput
}
