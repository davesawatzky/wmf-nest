import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input'
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input'
import { tbl_reg_unavailableUncheckedUpdateManyWithoutTbl_reg_groupNestedInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-unchecked-update-many-without-tbl-reg-group-nested.input'

@InputType()
export class tbl_reg_groupUncheckedUpdateWithoutTbl_registrationInput {
  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  id?: IntFieldUpdateOperationsInput

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
    () => tbl_reg_unavailableUncheckedUpdateManyWithoutTbl_reg_groupNestedInput,
    { nullable: true },
  )
  tbl_reg_unavailable?: tbl_reg_unavailableUncheckedUpdateManyWithoutTbl_reg_groupNestedInput
}
