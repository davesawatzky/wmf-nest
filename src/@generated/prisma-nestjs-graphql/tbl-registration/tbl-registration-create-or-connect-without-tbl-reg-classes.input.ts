import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateWithoutTbl_reg_classesInput } from './tbl-registration-create-without-tbl-reg-classes.input'

@InputType()
export class tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput {
  @Field(() => tbl_registrationWhereUniqueInput, { nullable: false })
  @Type(() => tbl_registrationWhereUniqueInput)
  where!: tbl_registrationWhereUniqueInput

  @Field(() => tbl_registrationCreateWithoutTbl_reg_classesInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_classesInput)
  create!: tbl_registrationCreateWithoutTbl_reg_classesInput
}
