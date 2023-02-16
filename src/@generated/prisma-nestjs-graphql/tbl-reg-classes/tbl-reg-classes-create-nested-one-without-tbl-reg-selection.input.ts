import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_classesCreateWithoutTbl_reg_selectionInput } from './tbl-reg-classes-create-without-tbl-reg-selection.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesCreateOrConnectWithoutTbl_reg_selectionInput } from './tbl-reg-classes-create-or-connect-without-tbl-reg-selection.input'
import { tbl_reg_classesWhereUniqueInput } from './tbl-reg-classes-where-unique.input'

@InputType()
export class tbl_reg_classesCreateNestedOneWithoutTbl_reg_selectionInput {
  @Field(() => tbl_reg_classesCreateWithoutTbl_reg_selectionInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_classesCreateWithoutTbl_reg_selectionInput)
  create?: tbl_reg_classesCreateWithoutTbl_reg_selectionInput

  @Field(() => tbl_reg_classesCreateOrConnectWithoutTbl_reg_selectionInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_classesCreateOrConnectWithoutTbl_reg_selectionInput)
  connectOrCreate?: tbl_reg_classesCreateOrConnectWithoutTbl_reg_selectionInput

  @Field(() => tbl_reg_classesWhereUniqueInput, { nullable: true })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  connect?: tbl_reg_classesWhereUniqueInput
}
