import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_selectionWhereUniqueInput } from './tbl-reg-selection-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_selectionUpdateWithoutTbl_reg_classesInput } from './tbl-reg-selection-update-without-tbl-reg-classes.input'

@InputType()
export class tbl_reg_selectionUpdateWithWhereUniqueWithoutTbl_reg_classesInput {
  @Field(() => tbl_reg_selectionWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_selectionWhereUniqueInput)
  where!: tbl_reg_selectionWhereUniqueInput

  @Field(() => tbl_reg_selectionUpdateWithoutTbl_reg_classesInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_selectionUpdateWithoutTbl_reg_classesInput)
  data!: tbl_reg_selectionUpdateWithoutTbl_reg_classesInput
}
