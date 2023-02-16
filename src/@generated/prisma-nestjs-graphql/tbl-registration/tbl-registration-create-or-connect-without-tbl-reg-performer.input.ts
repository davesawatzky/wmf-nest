import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateWithoutTbl_reg_performerInput } from './tbl-registration-create-without-tbl-reg-performer.input'

@InputType()
export class tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput {
  @Field(() => tbl_registrationWhereUniqueInput, { nullable: false })
  @Type(() => tbl_registrationWhereUniqueInput)
  where!: tbl_registrationWhereUniqueInput

  @Field(() => tbl_registrationCreateWithoutTbl_reg_performerInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_performerInput)
  create!: tbl_registrationCreateWithoutTbl_reg_performerInput
}
