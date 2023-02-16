import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationCreateWithoutTbl_reg_performerInput } from './tbl-registration-create-without-tbl-reg-performer.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput } from './tbl-registration-create-or-connect-without-tbl-reg-performer.input'
import { tbl_registrationUpsertWithoutTbl_reg_performerInput } from './tbl-registration-upsert-without-tbl-reg-performer.input'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'
import { tbl_registrationUpdateWithoutTbl_reg_performerInput } from './tbl-registration-update-without-tbl-reg-performer.input'

@InputType()
export class tbl_registrationUpdateOneRequiredWithoutTbl_reg_performerNestedInput {
  @Field(() => tbl_registrationCreateWithoutTbl_reg_performerInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_performerInput)
  create?: tbl_registrationCreateWithoutTbl_reg_performerInput

  @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput)
  connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput

  @Field(() => tbl_registrationUpsertWithoutTbl_reg_performerInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationUpsertWithoutTbl_reg_performerInput)
  upsert?: tbl_registrationUpsertWithoutTbl_reg_performerInput

  @Field(() => tbl_registrationWhereUniqueInput, { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  connect?: tbl_registrationWhereUniqueInput

  @Field(() => tbl_registrationUpdateWithoutTbl_reg_performerInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationUpdateWithoutTbl_reg_performerInput)
  update?: tbl_registrationUpdateWithoutTbl_reg_performerInput
}
