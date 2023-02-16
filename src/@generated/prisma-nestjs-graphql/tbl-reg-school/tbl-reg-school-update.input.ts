import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { tbl_registrationUpdateOneRequiredWithoutTbl_reg_schoolNestedInput } from '../tbl-registration/tbl-registration-update-one-required-without-tbl-reg-school-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_schoolUpdateInput {
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  name?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  division?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  streetNumber?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  streetName?: NullableStringFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  city?: StringFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  province?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  postalCode?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  phone?: NullableStringFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput

  @Field(
    () => tbl_registrationUpdateOneRequiredWithoutTbl_reg_schoolNestedInput,
    { nullable: true },
  )
  @Type(() => tbl_registrationUpdateOneRequiredWithoutTbl_reg_schoolNestedInput)
  tbl_registration?: tbl_registrationUpdateOneRequiredWithoutTbl_reg_schoolNestedInput
}
