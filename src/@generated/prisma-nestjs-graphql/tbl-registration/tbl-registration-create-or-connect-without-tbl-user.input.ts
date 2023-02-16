import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateWithoutTbl_userInput } from './tbl-registration-create-without-tbl-user.input'

@InputType()
export class tbl_registrationCreateOrConnectWithoutTbl_userInput {
  @Field(() => tbl_registrationWhereUniqueInput, { nullable: false })
  @Type(() => tbl_registrationWhereUniqueInput)
  where!: tbl_registrationWhereUniqueInput

  @Field(() => tbl_registrationCreateWithoutTbl_userInput, { nullable: false })
  @Type(() => tbl_registrationCreateWithoutTbl_userInput)
  create!: tbl_registrationCreateWithoutTbl_userInput
}
