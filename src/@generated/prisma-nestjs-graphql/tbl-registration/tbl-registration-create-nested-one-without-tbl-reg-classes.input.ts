import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationCreateWithoutTbl_reg_classesInput } from './tbl-registration-create-without-tbl-reg-classes.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput } from './tbl-registration-create-or-connect-without-tbl-reg-classes.input'
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input'

@InputType()
export class tbl_registrationCreateNestedOneWithoutTbl_reg_classesInput {
  @Field(() => tbl_registrationCreateWithoutTbl_reg_classesInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateWithoutTbl_reg_classesInput)
  create?: tbl_registrationCreateWithoutTbl_reg_classesInput

  @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput)
  connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_classesInput

  @Field(() => tbl_registrationWhereUniqueInput, { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  connect?: tbl_registrationWhereUniqueInput
}
