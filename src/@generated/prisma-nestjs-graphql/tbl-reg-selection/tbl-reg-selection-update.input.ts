import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { tbl_reg_classesUpdateOneRequiredWithoutTbl_reg_selectionNestedInput } from '../tbl-reg-classes/tbl-reg-classes-update-one-required-without-tbl-reg-selection-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_selectionUpdateInput {
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  title?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  largerWork?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  movement?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  composer?: NullableStringFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  duration?: StringFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput

  @Field(
    () => tbl_reg_classesUpdateOneRequiredWithoutTbl_reg_selectionNestedInput,
    { nullable: true },
  )
  @Type(
    () => tbl_reg_classesUpdateOneRequiredWithoutTbl_reg_selectionNestedInput,
  )
  tbl_reg_classes?: tbl_reg_classesUpdateOneRequiredWithoutTbl_reg_selectionNestedInput
}
