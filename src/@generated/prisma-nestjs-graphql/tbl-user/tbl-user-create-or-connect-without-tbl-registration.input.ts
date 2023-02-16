import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_userWhereUniqueInput } from './tbl-user-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_userCreateWithoutTbl_registrationInput } from './tbl-user-create-without-tbl-registration.input'

@InputType()
export class tbl_userCreateOrConnectWithoutTbl_registrationInput {
  @Field(() => tbl_userWhereUniqueInput, { nullable: false })
  @Type(() => tbl_userWhereUniqueInput)
  where!: tbl_userWhereUniqueInput

  @Field(() => tbl_userCreateWithoutTbl_registrationInput, { nullable: false })
  @Type(() => tbl_userCreateWithoutTbl_registrationInput)
  create!: tbl_userCreateWithoutTbl_registrationInput
}
