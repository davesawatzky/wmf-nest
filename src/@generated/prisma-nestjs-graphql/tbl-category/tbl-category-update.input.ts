import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { tbl_classlistUpdateManyWithoutTbl_categoryNestedInput } from '../tbl-classlist/tbl-classlist-update-many-without-tbl-category-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_categoryUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  description?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  requiredComposer?: NullableStringFieldUpdateOperationsInput

  @Field(() => tbl_classlistUpdateManyWithoutTbl_categoryNestedInput, {
    nullable: true,
  })
  @Type(() => tbl_classlistUpdateManyWithoutTbl_categoryNestedInput)
  tbl_classlist?: tbl_classlistUpdateManyWithoutTbl_categoryNestedInput
}
