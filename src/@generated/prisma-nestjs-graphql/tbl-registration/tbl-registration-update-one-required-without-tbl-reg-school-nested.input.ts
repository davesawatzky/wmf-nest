import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationCreateWithoutTbl_reg_schoolInput } from './tbl-registration-create-without-tbl-reg-school.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput } from './tbl-registration-create-or-connect-without-tbl-reg-school.input'
import { tbl_registrationUpsertWithoutTbl_reg_schoolInput } from './tbl-registration-upsert-without-tbl-reg-school.input'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'
import { tbl_registrationUpdateWithoutTbl_reg_schoolInput } from './tbl-registration-update-without-tbl-reg-school.input'

@InputType()
export class tbl_registrationUpdateOneRequiredWithoutTbl_reg_schoolNestedInput {
  @Field(() => tbl_registrationCreateWithoutTbl_reg_schoolInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_schoolInput)
  create?: tbl_registrationCreateWithoutTbl_reg_schoolInput

  @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput)
  connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput

  @Field(() => tbl_registrationUpsertWithoutTbl_reg_schoolInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationUpsertWithoutTbl_reg_schoolInput)
  upsert?: tbl_registrationUpsertWithoutTbl_reg_schoolInput

  @Field(() => tbl_registrationWhereUniqueInput, { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  connect?: tbl_registrationWhereUniqueInput

  @Field(() => tbl_registrationUpdateWithoutTbl_reg_schoolInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationUpdateWithoutTbl_reg_schoolInput)
  update?: tbl_registrationUpdateWithoutTbl_reg_schoolInput
}
