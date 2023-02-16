import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { tbl_registrationUpdateOneRequiredWithoutTbl_reg_groupNestedInput } from '../tbl-registration/tbl-registration-update-one-required-without-tbl-reg-group-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput {
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  name?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  groupType?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  numberOfPerformers?: NullableIntFieldUpdateOperationsInput

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  age?: NullableIntFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  instruments?: NullableStringFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput

  @Field(
    () => tbl_registrationUpdateOneRequiredWithoutTbl_reg_groupNestedInput,
    { nullable: true },
  )
  @Type(() => tbl_registrationUpdateOneRequiredWithoutTbl_reg_groupNestedInput)
  tbl_registration?: tbl_registrationUpdateOneRequiredWithoutTbl_reg_groupNestedInput
}
