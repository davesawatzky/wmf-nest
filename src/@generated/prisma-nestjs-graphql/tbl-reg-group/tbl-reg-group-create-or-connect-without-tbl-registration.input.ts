import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_groupWhereUniqueInput } from './tbl-reg-group-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_groupCreateWithoutTbl_registrationInput } from './tbl-reg-group-create-without-tbl-registration.input'

@InputType()
export class tbl_reg_groupCreateOrConnectWithoutTbl_registrationInput {
  @Field(() => tbl_reg_groupWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  where!: tbl_reg_groupWhereUniqueInput

  @Field(() => tbl_reg_groupCreateWithoutTbl_registrationInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_groupCreateWithoutTbl_registrationInput)
  create!: tbl_reg_groupCreateWithoutTbl_registrationInput
}
