import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationCreateWithoutTbl_reg_communityInput } from './tbl-registration-create-without-tbl-reg-community.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateOrConnectWithoutTbl_reg_communityInput } from './tbl-registration-create-or-connect-without-tbl-reg-community.input'
import { tbl_registrationUpsertWithoutTbl_reg_communityInput } from './tbl-registration-upsert-without-tbl-reg-community.input'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'
import { tbl_registrationUpdateWithoutTbl_reg_communityInput } from './tbl-registration-update-without-tbl-reg-community.input'

@InputType()
export class tbl_registrationUpdateOneRequiredWithoutTbl_reg_communityNestedInput {
  @Field(() => tbl_registrationCreateWithoutTbl_reg_communityInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_communityInput)
  create?: tbl_registrationCreateWithoutTbl_reg_communityInput

  @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_communityInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_communityInput)
  connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_communityInput

  @Field(() => tbl_registrationUpsertWithoutTbl_reg_communityInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationUpsertWithoutTbl_reg_communityInput)
  upsert?: tbl_registrationUpsertWithoutTbl_reg_communityInput

  @Field(() => tbl_registrationWhereUniqueInput, { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  connect?: tbl_registrationWhereUniqueInput

  @Field(() => tbl_registrationUpdateWithoutTbl_reg_communityInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationUpdateWithoutTbl_reg_communityInput)
  update?: tbl_registrationUpdateWithoutTbl_reg_communityInput
}
