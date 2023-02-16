import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_communityCreateWithoutTbl_registrationInput } from './tbl-reg-community-create-without-tbl-registration.input'
import { Type } from 'class-transformer'
import { tbl_reg_communityCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-community-create-or-connect-without-tbl-registration.input'
import { tbl_reg_communityUpsertWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-community-upsert-with-where-unique-without-tbl-registration.input'
import { tbl_reg_communityCreateManyTbl_registrationInputEnvelope } from './tbl-reg-community-create-many-tbl-registration-input-envelope.input'
import { tbl_reg_communityWhereUniqueInput } from './tbl-reg-community-where-unique.input'
import { tbl_reg_communityUpdateWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-community-update-with-where-unique-without-tbl-registration.input'
import { tbl_reg_communityUpdateManyWithWhereWithoutTbl_registrationInput } from './tbl-reg-community-update-many-with-where-without-tbl-registration.input'
import { tbl_reg_communityScalarWhereInput } from './tbl-reg-community-scalar-where.input'

@InputType()
export class tbl_reg_communityUncheckedUpdateManyWithoutTbl_registrationNestedInput {
  @Field(() => [tbl_reg_communityCreateWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_communityCreateWithoutTbl_registrationInput)
  create?: Array<tbl_reg_communityCreateWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_communityCreateOrConnectWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_communityCreateOrConnectWithoutTbl_registrationInput)
  connectOrCreate?: Array<tbl_reg_communityCreateOrConnectWithoutTbl_registrationInput>

  @Field(
    () => [tbl_reg_communityUpsertWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(
    () => tbl_reg_communityUpsertWithWhereUniqueWithoutTbl_registrationInput,
  )
  upsert?: Array<tbl_reg_communityUpsertWithWhereUniqueWithoutTbl_registrationInput>

  @Field(() => tbl_reg_communityCreateManyTbl_registrationInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_communityCreateManyTbl_registrationInputEnvelope)
  createMany?: tbl_reg_communityCreateManyTbl_registrationInputEnvelope

  @Field(() => [tbl_reg_communityWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  set?: Array<tbl_reg_communityWhereUniqueInput>

  @Field(() => [tbl_reg_communityWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  disconnect?: Array<tbl_reg_communityWhereUniqueInput>

  @Field(() => [tbl_reg_communityWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  delete?: Array<tbl_reg_communityWhereUniqueInput>

  @Field(() => [tbl_reg_communityWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  connect?: Array<tbl_reg_communityWhereUniqueInput>

  @Field(
    () => [tbl_reg_communityUpdateWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(
    () => tbl_reg_communityUpdateWithWhereUniqueWithoutTbl_registrationInput,
  )
  update?: Array<tbl_reg_communityUpdateWithWhereUniqueWithoutTbl_registrationInput>

  @Field(
    () => [tbl_reg_communityUpdateManyWithWhereWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(() => tbl_reg_communityUpdateManyWithWhereWithoutTbl_registrationInput)
  updateMany?: Array<tbl_reg_communityUpdateManyWithWhereWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_communityScalarWhereInput], { nullable: true })
  @Type(() => tbl_reg_communityScalarWhereInput)
  deleteMany?: Array<tbl_reg_communityScalarWhereInput>
}
