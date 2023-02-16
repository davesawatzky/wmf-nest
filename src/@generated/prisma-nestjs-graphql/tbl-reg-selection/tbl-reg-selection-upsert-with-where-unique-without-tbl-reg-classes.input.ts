import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_selectionWhereUniqueInput } from './tbl-reg-selection-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_selectionUpdateWithoutTbl_reg_classesInput } from './tbl-reg-selection-update-without-tbl-reg-classes.input'
import { tbl_reg_selectionCreateWithoutTbl_reg_classesInput } from './tbl-reg-selection-create-without-tbl-reg-classes.input'

@InputType()
export class tbl_reg_selectionUpsertWithWhereUniqueWithoutTbl_reg_classesInput {
  @Field(() => tbl_reg_selectionWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_selectionWhereUniqueInput)
  where!: tbl_reg_selectionWhereUniqueInput

  @Field(() => tbl_reg_selectionUpdateWithoutTbl_reg_classesInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_selectionUpdateWithoutTbl_reg_classesInput)
  update!: tbl_reg_selectionUpdateWithoutTbl_reg_classesInput

  @Field(() => tbl_reg_selectionCreateWithoutTbl_reg_classesInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_selectionCreateWithoutTbl_reg_classesInput)
  create!: tbl_reg_selectionCreateWithoutTbl_reg_classesInput
}
