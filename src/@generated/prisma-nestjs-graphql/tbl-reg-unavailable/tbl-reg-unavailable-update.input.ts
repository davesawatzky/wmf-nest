import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { tbl_reg_groupUpdateOneRequiredWithoutTbl_reg_unavailableNestedInput } from '../tbl-reg-group/tbl-reg-group-update-one-required-without-tbl-reg-unavailable-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_unavailableUpdateInput {
  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  date?: DateTimeFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  time?: DateTimeFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput

  @Field(
    () => tbl_reg_groupUpdateOneRequiredWithoutTbl_reg_unavailableNestedInput,
    { nullable: true },
  )
  @Type(
    () => tbl_reg_groupUpdateOneRequiredWithoutTbl_reg_unavailableNestedInput,
  )
  tbl_reg_group?: tbl_reg_groupUpdateOneRequiredWithoutTbl_reg_unavailableNestedInput
}
