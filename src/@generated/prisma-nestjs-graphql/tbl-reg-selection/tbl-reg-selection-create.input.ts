import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_classesCreateNestedOneWithoutTbl_reg_selectionInput } from '../tbl-reg-classes/tbl-reg-classes-create-nested-one-without-tbl-reg-selection.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_selectionCreateInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  largerWork?: string

  @Field(() => String, { nullable: true })
  movement?: string

  @Field(() => String, { nullable: true })
  composer?: string

  @Field(() => String, { nullable: true })
  duration?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string

  @Field(() => tbl_reg_classesCreateNestedOneWithoutTbl_reg_selectionInput, {
    nullable: false,
  })
  @Type(() => tbl_reg_classesCreateNestedOneWithoutTbl_reg_selectionInput)
  tbl_reg_classes!: tbl_reg_classesCreateNestedOneWithoutTbl_reg_selectionInput
}
