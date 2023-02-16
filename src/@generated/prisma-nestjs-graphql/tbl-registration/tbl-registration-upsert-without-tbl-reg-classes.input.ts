import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationUpdateWithoutTbl_reg_classesInput } from './tbl-registration-update-without-tbl-reg-classes.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateWithoutTbl_reg_classesInput } from './tbl-registration-create-without-tbl-reg-classes.input'

@InputType()
export class tbl_registrationUpsertWithoutTbl_reg_classesInput {
  @Field(() => tbl_registrationUpdateWithoutTbl_reg_classesInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationUpdateWithoutTbl_reg_classesInput)
  update!: tbl_registrationUpdateWithoutTbl_reg_classesInput

  @Field(() => tbl_registrationCreateWithoutTbl_reg_classesInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_classesInput)
  create!: tbl_registrationCreateWithoutTbl_reg_classesInput
}
