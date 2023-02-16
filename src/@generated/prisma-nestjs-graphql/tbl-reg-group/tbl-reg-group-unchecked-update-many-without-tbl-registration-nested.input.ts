import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_groupCreateWithoutTbl_registrationInput } from './tbl-reg-group-create-without-tbl-registration.input'
import { Type } from 'class-transformer'
import { tbl_reg_groupCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-group-create-or-connect-without-tbl-registration.input'
import { tbl_reg_groupUpsertWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-group-upsert-with-where-unique-without-tbl-registration.input'
import { tbl_reg_groupCreateManyTbl_registrationInputEnvelope } from './tbl-reg-group-create-many-tbl-registration-input-envelope.input'
import { tbl_reg_groupWhereUniqueInput } from './tbl-reg-group-where-unique.input'
import { tbl_reg_groupUpdateWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-group-update-with-where-unique-without-tbl-registration.input'
import { tbl_reg_groupUpdateManyWithWhereWithoutTbl_registrationInput } from './tbl-reg-group-update-many-with-where-without-tbl-registration.input'
import { tbl_reg_groupScalarWhereInput } from './tbl-reg-group-scalar-where.input'

@InputType()
export class tbl_reg_groupUncheckedUpdateManyWithoutTbl_registrationNestedInput {
  @Field(() => [tbl_reg_groupCreateWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_groupCreateWithoutTbl_registrationInput)
  create?: Array<tbl_reg_groupCreateWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_groupCreateOrConnectWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_groupCreateOrConnectWithoutTbl_registrationInput)
  connectOrCreate?: Array<tbl_reg_groupCreateOrConnectWithoutTbl_registrationInput>

  @Field(
    () => [tbl_reg_groupUpsertWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(() => tbl_reg_groupUpsertWithWhereUniqueWithoutTbl_registrationInput)
  upsert?: Array<tbl_reg_groupUpsertWithWhereUniqueWithoutTbl_registrationInput>

  @Field(() => tbl_reg_groupCreateManyTbl_registrationInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_groupCreateManyTbl_registrationInputEnvelope)
  createMany?: tbl_reg_groupCreateManyTbl_registrationInputEnvelope

  @Field(() => [tbl_reg_groupWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  set?: Array<tbl_reg_groupWhereUniqueInput>

  @Field(() => [tbl_reg_groupWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  disconnect?: Array<tbl_reg_groupWhereUniqueInput>

  @Field(() => [tbl_reg_groupWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  delete?: Array<tbl_reg_groupWhereUniqueInput>

  @Field(() => [tbl_reg_groupWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  connect?: Array<tbl_reg_groupWhereUniqueInput>

  @Field(
    () => [tbl_reg_groupUpdateWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(() => tbl_reg_groupUpdateWithWhereUniqueWithoutTbl_registrationInput)
  update?: Array<tbl_reg_groupUpdateWithWhereUniqueWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_groupUpdateManyWithWhereWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_groupUpdateManyWithWhereWithoutTbl_registrationInput)
  updateMany?: Array<tbl_reg_groupUpdateManyWithWhereWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_groupScalarWhereInput], { nullable: true })
  @Type(() => tbl_reg_groupScalarWhereInput)
  deleteMany?: Array<tbl_reg_groupScalarWhereInput>
}
