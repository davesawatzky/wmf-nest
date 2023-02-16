import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_selectionCreateWithoutTbl_reg_classesInput } from './tbl-reg-selection-create-without-tbl-reg-classes.input'
import { Type } from 'class-transformer'
import { tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput } from './tbl-reg-selection-create-or-connect-without-tbl-reg-classes.input'
import { tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope } from './tbl-reg-selection-create-many-tbl-reg-classes-input-envelope.input'
import { tbl_reg_selectionWhereUniqueInput } from './tbl-reg-selection-where-unique.input'

@InputType()
export class tbl_reg_selectionUncheckedCreateNestedManyWithoutTbl_reg_classesInput {
  @Field(() => [tbl_reg_selectionCreateWithoutTbl_reg_classesInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_selectionCreateWithoutTbl_reg_classesInput)
  create?: Array<tbl_reg_selectionCreateWithoutTbl_reg_classesInput>

  @Field(() => [tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput)
  connectOrCreate?: Array<tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput>

  @Field(() => tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope)
  createMany?: tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope

  @Field(() => [tbl_reg_selectionWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_selectionWhereUniqueInput)
  connect?: Array<tbl_reg_selectionWhereUniqueInput>
}
