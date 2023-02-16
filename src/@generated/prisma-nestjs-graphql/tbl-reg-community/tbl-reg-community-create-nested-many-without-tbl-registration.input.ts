import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_communityCreateWithoutTbl_registrationInput } from './tbl-reg-community-create-without-tbl-registration.input'
import { Type } from 'class-transformer'
import { tbl_reg_communityCreateOrConnectWithoutTbl_registrationInput } from './tbl-reg-community-create-or-connect-without-tbl-registration.input'
import { tbl_reg_communityCreateManyTbl_registrationInputEnvelope } from './tbl-reg-community-create-many-tbl-registration-input-envelope.input'
import { tbl_reg_communityWhereUniqueInput } from './tbl-reg-community-where-unique.input'

@InputType()
export class tbl_reg_communityCreateNestedManyWithoutTbl_registrationInput {
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

  @Field(() => tbl_reg_communityCreateManyTbl_registrationInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_communityCreateManyTbl_registrationInputEnvelope)
  createMany?: tbl_reg_communityCreateManyTbl_registrationInputEnvelope

  @Field(() => [tbl_reg_communityWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_communityWhereUniqueInput)
  connect?: Array<tbl_reg_communityWhereUniqueInput>
}
