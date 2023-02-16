import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_classesWhereUniqueInput } from './tbl-reg-classes-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesUpdateWithoutTbl_registrationInput } from './tbl-reg-classes-update-without-tbl-registration.input'

@InputType()
export class tbl_reg_classesUpdateWithWhereUniqueWithoutTbl_registrationInput {
  @Field(() => tbl_reg_classesWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  where!: tbl_reg_classesWhereUniqueInput

  @Field(() => tbl_reg_classesUpdateWithoutTbl_registrationInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_classesUpdateWithoutTbl_registrationInput)
  data!: tbl_reg_classesUpdateWithoutTbl_registrationInput
}
