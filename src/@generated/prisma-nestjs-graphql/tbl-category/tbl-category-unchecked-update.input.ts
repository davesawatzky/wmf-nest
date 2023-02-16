import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { tbl_classlistUncheckedUpdateManyWithoutTbl_categoryNestedInput } from '../tbl-classlist/tbl-classlist-unchecked-update-many-without-tbl-category-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_categoryUncheckedUpdateInput {
  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  id?: IntFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  description?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  requiredComposer?: NullableStringFieldUpdateOperationsInput

  @Field(() => tbl_classlistUncheckedUpdateManyWithoutTbl_categoryNestedInput, {
    nullable: true,
  })
  @Type(() => tbl_classlistUncheckedUpdateManyWithoutTbl_categoryNestedInput)
  tbl_classlist?: tbl_classlistUncheckedUpdateManyWithoutTbl_categoryNestedInput
}
