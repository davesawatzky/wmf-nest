import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_classesCreateWithoutTbl_registrationInput } from './tbl-reg-classes-create-without-tbl-registration.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-classes-create-or-connect-without-tbl-registration.input'
import { tbl_reg_classesUpsertWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-classes-upsert-with-where-unique-without-tbl-registration.input'
import { tbl_reg_classesCreateManyTbl_registrationInputEnvelope } from './tbl-reg-classes-create-many-tbl-registration-input-envelope.input'
import { tbl_reg_classesWhereUniqueInput } from './tbl-reg-classes-where-unique.input'
import { tbl_reg_classesUpdateWithWhereUniqueWithoutTbl_registrationInput } from './tbl-reg-classes-update-with-where-unique-without-tbl-registration.input'
import { tbl_reg_classesUpdateManyWithWhereWithoutTbl_registrationInput } from './tbl-reg-classes-update-many-with-where-without-tbl-registration.input'
import { tbl_reg_classesScalarWhereInput } from './tbl-reg-classes-scalar-where.input'

@InputType()
export class tbl_reg_classesUpdateManyWithoutTbl_registrationNestedInput {
  @Field(() => [tbl_reg_classesCreateWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_classesCreateWithoutTbl_registrationInput)
  create?: Array<tbl_reg_classesCreateWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput)
  connectOrCreate?: Array<tbl_reg_classesCreateOrConnectWithoutTbl_registrationInput>

  @Field(
    () => [tbl_reg_classesUpsertWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(() => tbl_reg_classesUpsertWithWhereUniqueWithoutTbl_registrationInput)
  upsert?: Array<tbl_reg_classesUpsertWithWhereUniqueWithoutTbl_registrationInput>

  @Field(() => tbl_reg_classesCreateManyTbl_registrationInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_classesCreateManyTbl_registrationInputEnvelope)
  createMany?: tbl_reg_classesCreateManyTbl_registrationInputEnvelope

  @Field(() => [tbl_reg_classesWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  set?: Array<tbl_reg_classesWhereUniqueInput>

  @Field(() => [tbl_reg_classesWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  disconnect?: Array<tbl_reg_classesWhereUniqueInput>

  @Field(() => [tbl_reg_classesWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  delete?: Array<tbl_reg_classesWhereUniqueInput>

  @Field(() => [tbl_reg_classesWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  connect?: Array<tbl_reg_classesWhereUniqueInput>

  @Field(
    () => [tbl_reg_classesUpdateWithWhereUniqueWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(() => tbl_reg_classesUpdateWithWhereUniqueWithoutTbl_registrationInput)
  update?: Array<tbl_reg_classesUpdateWithWhereUniqueWithoutTbl_registrationInput>

  @Field(
    () => [tbl_reg_classesUpdateManyWithWhereWithoutTbl_registrationInput],
    { nullable: true },
  )
  @Type(() => tbl_reg_classesUpdateManyWithWhereWithoutTbl_registrationInput)
  updateMany?: Array<tbl_reg_classesUpdateManyWithWhereWithoutTbl_registrationInput>

  @Field(() => [tbl_reg_classesScalarWhereInput], { nullable: true })
  @Type(() => tbl_reg_classesScalarWhereInput)
  deleteMany?: Array<tbl_reg_classesScalarWhereInput>
}
