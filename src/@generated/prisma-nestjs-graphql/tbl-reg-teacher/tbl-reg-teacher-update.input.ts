import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { tbl_registrationUpdateOneRequiredWithoutTbl_reg_teacherNestedInput } from '../tbl-registration/tbl-registration-update-one-required-without-tbl-reg-teacher-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_teacherUpdateInput {
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  prefix?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  lastName?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  firstName?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  apartment?: NullableStringFieldUpdateOperationsInput

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

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  email?: NullableStringFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput

  @Field(
    () => tbl_registrationUpdateOneRequiredWithoutTbl_reg_teacherNestedInput,
    { nullable: true },
  )
  @Type(
    () => tbl_registrationUpdateOneRequiredWithoutTbl_reg_teacherNestedInput,
  )
  tbl_registration?: tbl_registrationUpdateOneRequiredWithoutTbl_reg_teacherNestedInput
}
