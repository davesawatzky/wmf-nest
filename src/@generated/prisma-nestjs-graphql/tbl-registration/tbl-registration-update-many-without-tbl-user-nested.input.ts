import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationCreateWithoutTbl_userInput } from './tbl-registration-create-without-tbl-user.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateOrConnectWithoutTbl_userInput } from './tbl-registration-create-or-connect-without-tbl-user.input'
import { tbl_registrationUpsertWithWhereUniqueWithoutTbl_userInput } from './tbl-registration-upsert-with-where-unique-without-tbl-user.input'
import { tbl_registrationCreateManyTbl_userInputEnvelope } from './tbl-registration-create-many-tbl-user-input-envelope.input'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'
import { tbl_registrationUpdateWithWhereUniqueWithoutTbl_userInput } from './tbl-registration-update-with-where-unique-without-tbl-user.input'
import { tbl_registrationUpdateManyWithWhereWithoutTbl_userInput } from './tbl-registration-update-many-with-where-without-tbl-user.input'
import { tbl_registrationScalarWhereInput } from './tbl-registration-scalar-where.input'

@InputType()
export class tbl_registrationUpdateManyWithoutTbl_userNestedInput {
  @Field(() => [tbl_registrationCreateWithoutTbl_userInput], { nullable: true })
  @Type(() => tbl_registrationCreateWithoutTbl_userInput)
  create?: Array<tbl_registrationCreateWithoutTbl_userInput>

  @Field(() => [tbl_registrationCreateOrConnectWithoutTbl_userInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateOrConnectWithoutTbl_userInput)
  connectOrCreate?: Array<tbl_registrationCreateOrConnectWithoutTbl_userInput>

  @Field(() => [tbl_registrationUpsertWithWhereUniqueWithoutTbl_userInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationUpsertWithWhereUniqueWithoutTbl_userInput)
  upsert?: Array<tbl_registrationUpsertWithWhereUniqueWithoutTbl_userInput>

  @Field(() => tbl_registrationCreateManyTbl_userInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateManyTbl_userInputEnvelope)
  createMany?: tbl_registrationCreateManyTbl_userInputEnvelope

  @Field(() => [tbl_registrationWhereUniqueInput], { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  set?: Array<tbl_registrationWhereUniqueInput>

  @Field(() => [tbl_registrationWhereUniqueInput], { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  disconnect?: Array<tbl_registrationWhereUniqueInput>

  @Field(() => [tbl_registrationWhereUniqueInput], { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  delete?: Array<tbl_registrationWhereUniqueInput>

  @Field(() => [tbl_registrationWhereUniqueInput], { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  connect?: Array<tbl_registrationWhereUniqueInput>

  @Field(() => [tbl_registrationUpdateWithWhereUniqueWithoutTbl_userInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationUpdateWithWhereUniqueWithoutTbl_userInput)
  update?: Array<tbl_registrationUpdateWithWhereUniqueWithoutTbl_userInput>

  @Field(() => [tbl_registrationUpdateManyWithWhereWithoutTbl_userInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationUpdateManyWithWhereWithoutTbl_userInput)
  updateMany?: Array<tbl_registrationUpdateManyWithWhereWithoutTbl_userInput>

  @Field(() => [tbl_registrationScalarWhereInput], { nullable: true })
  @Type(() => tbl_registrationScalarWhereInput)
  deleteMany?: Array<tbl_registrationScalarWhereInput>
}
