import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_groupCreateWithoutTbl_registrationInput } from './tbl-reg-group-create-without-tbl-registration.input'
import { Type } from 'class-transformer'
import { tbl_reg_groupCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-group-create-or-connect-without-tbl-registration.input'
import { tbl_reg_groupCreateManyTbl_registrationInputEnvelope } from './tbl-reg-group-create-many-tbl-registration-input-envelope.input'
import { tbl_reg_groupWhereUniqueInput } from './tbl-reg-group-where-unique.input'

@InputType()
export class tbl_reg_groupCreateNestedManyWithoutTbl_registrationInput {
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

  @Field(() => tbl_reg_groupCreateManyTbl_registrationInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_groupCreateManyTbl_registrationInputEnvelope)
  createMany?: tbl_reg_groupCreateManyTbl_registrationInputEnvelope

  @Field(() => [tbl_reg_groupWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  connect?: Array<tbl_reg_groupWhereUniqueInput>
}
