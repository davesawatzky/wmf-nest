import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationCreateWithoutTbl_reg_communityInput } from './tbl-registration-create-without-tbl-reg-community.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateOrConnectWithoutTbl_reg_communityInput } from './tbl-registration-create-or-connect-without-tbl-reg-community.input'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'

@InputType()
export class tbl_registrationCreateNestedOneWithoutTbl_reg_communityInput {
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

  @Field(() => tbl_registrationWhereUniqueInput, { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  connect?: tbl_registrationWhereUniqueInput
}
