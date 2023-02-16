import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_performerCreateWithoutTbl_registrationInput } from './tbl-reg-performer-create-without-tbl-registration.input'
import { Type } from 'class-transformer'
import { tbl_reg_performerCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-performer-create-or-connect-without-tbl-registration.input'
import { tbl_reg_performerUpsertWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-performer-upsert-with-where-unique-without-tbl-registration.input'
import { tbl_reg_performerCreateManyTbl_registrationInputEnvelope } from './tbl-reg-performer-create-many-tbl-registration-input-envelope.input'
import { tbl_reg_performerWhereUniqueInput } from './tbl-reg-performer-where-unique.input'
import { tbl_reg_performerUpdateWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-performer-update-with-where-unique-without-tbl-registration.input'
import { tbl_reg_performerUpdateManyWithWhereWithoutTbl_registrationInput } from './tbl-reg-performer-update-many-with-where-without-tbl-registration.input'
import { tbl_reg_performerScalarWhereInput } from './tbl-reg-performer-scalar-where.input'

@InputType()
export class tbl_reg_performerUpdateManyWithoutTbl_registrationNestedInput {
  @Field(() => [tbl_reg_performerCreateWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_performerCreateWithoutTbl_registrationInput)
  create?: Array<tbl_reg_performerCreateWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_performerCreateOrConnectWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_performerCreateOrConnectWithoutTbl_registrationInput)
  connectOrCreate?: Array<tbl_reg_performerCreateOrConnectWithoutTbl_registrationInput>

  @Field(
    () => [tbl_reg_performerUpsertWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(
    () => tbl_reg_performerUpsertWithWhereUniqueWithoutTbl_registrationInput,
  )
  upsert?: Array<tbl_reg_performerUpsertWithWhereUniqueWithoutTbl_registrationInput>

  @Field(() => tbl_reg_performerCreateManyTbl_registrationInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_performerCreateManyTbl_registrationInputEnvelope)
  createMany?: tbl_reg_performerCreateManyTbl_registrationInputEnvelope

  @Field(() => [tbl_reg_performerWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  set?: Array<tbl_reg_performerWhereUniqueInput>

  @Field(() => [tbl_reg_performerWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  disconnect?: Array<tbl_reg_performerWhereUniqueInput>

  @Field(() => [tbl_reg_performerWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  delete?: Array<tbl_reg_performerWhereUniqueInput>

  @Field(() => [tbl_reg_performerWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  connect?: Array<tbl_reg_performerWhereUniqueInput>

  @Field(
    () => [tbl_reg_performerUpdateWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(
    () => tbl_reg_performerUpdateWithWhereUniqueWithoutTbl_registrationInput,
  )
  update?: Array<tbl_reg_performerUpdateWithWhereUniqueWithoutTbl_registrationInput>

  @Field(
    () => [tbl_reg_performerUpdateManyWithWhereWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(() => tbl_reg_performerUpdateManyWithWhereWithoutTbl_registrationInput)
  updateMany?: Array<tbl_reg_performerUpdateManyWithWhereWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_performerScalarWhereInput], { nullable: true })
  @Type(() => tbl_reg_performerScalarWhereInput)
  deleteMany?: Array<tbl_reg_performerScalarWhereInput>
}
