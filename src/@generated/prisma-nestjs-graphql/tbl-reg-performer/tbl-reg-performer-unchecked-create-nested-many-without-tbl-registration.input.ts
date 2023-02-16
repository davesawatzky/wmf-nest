import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_performerCreateWithoutTbl_registrationInput } from './tbl-reg-performer-create-without-tbl-registration.input'
import { Type } from 'class-transformer'
import { tbl_reg_performerCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-performer-create-or-connect-without-tbl-registration.input'
import { tbl_reg_performerCreateManyTbl_registrationInputEnvelope } from './tbl-reg-performer-create-many-tbl-registration-input-envelope.input'
import { tbl_reg_performerWhereUniqueInput } from './tbl-reg-performer-where-unique.input'

@InputType()
export class tbl_reg_performerUncheckedCreateNestedManyWithoutTbl_registrationInput {
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

  @Field(() => tbl_reg_performerCreateManyTbl_registrationInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_performerCreateManyTbl_registrationInputEnvelope)
  createMany?: tbl_reg_performerCreateManyTbl_registrationInputEnvelope

  @Field(() => [tbl_reg_performerWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  connect?: Array<tbl_reg_performerWhereUniqueInput>
}
