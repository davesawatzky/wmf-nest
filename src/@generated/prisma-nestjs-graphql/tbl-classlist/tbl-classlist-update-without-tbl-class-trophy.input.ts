import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { Enumtbl_SGSFieldUpdateOperationsInput } from '../prisma/enumtbl-sgs-field-update-operations.input'
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input'
import { Type } from 'class-transformer'
import { tbl_categoryUpdateOneRequiredWithoutTbl_classlistNestedInput } from '../tbl-category/tbl-category-update-one-required-without-tbl-classlist-nested.input'
import { tbl_levelUpdateOneRequiredWithoutTbl_classlistNestedInput } from '../tbl-level/tbl-level-update-one-required-without-tbl-classlist-nested.input'
import { tbl_subdisciplineUpdateOneRequiredWithoutTbl_classlistNestedInput } from '../tbl-subdiscipline/tbl-subdiscipline-update-one-required-without-tbl-classlist-nested.input'

@InputType()
export class tbl_classlistUpdateWithoutTbl_class_trophyInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  classNumber?: StringFieldUpdateOperationsInput

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  minSelection?: IntFieldUpdateOperationsInput

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  maxSelection?: IntFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  requiredSelection?: NullableStringFieldUpdateOperationsInput

  @Field(() => Enumtbl_SGSFieldUpdateOperationsInput, { nullable: true })
  SGSlabel?: Enumtbl_SGSFieldUpdateOperationsInput

  @Field(() => NullableDecimalFieldUpdateOperationsInput, { nullable: true })
  @Type(() => NullableDecimalFieldUpdateOperationsInput)
  price?: NullableDecimalFieldUpdateOperationsInput

  @Field(() => tbl_categoryUpdateOneRequiredWithoutTbl_classlistNestedInput, {
    nullable: true,
  })
  @Type(() => tbl_categoryUpdateOneRequiredWithoutTbl_classlistNestedInput)
  tbl_category?: tbl_categoryUpdateOneRequiredWithoutTbl_classlistNestedInput

  @Field(() => tbl_levelUpdateOneRequiredWithoutTbl_classlistNestedInput, {
    nullable: true,
  })
  @Type(() => tbl_levelUpdateOneRequiredWithoutTbl_classlistNestedInput)
  tbl_level?: tbl_levelUpdateOneRequiredWithoutTbl_classlistNestedInput

  @Field(
    () => tbl_subdisciplineUpdateOneRequiredWithoutTbl_classlistNestedInput,
    { nullable: true },
  )
  @Type(() => tbl_subdisciplineUpdateOneRequiredWithoutTbl_classlistNestedInput)
  tbl_subdiscipline?: tbl_subdisciplineUpdateOneRequiredWithoutTbl_classlistNestedInput
}
