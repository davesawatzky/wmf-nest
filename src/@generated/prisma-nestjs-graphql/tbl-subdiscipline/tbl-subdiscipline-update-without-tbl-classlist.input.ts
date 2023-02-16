import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input'
import { Enumtbl_subdiscipline_SGSlabelFieldUpdateOperationsInput } from '../prisma/enumtbl-subdiscipline-sg-slabel-field-update-operations.input'
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input'
import { Type } from 'class-transformer'
import { tbl_disciplineUpdateOneRequiredWithoutTbl_subdisciplineNestedInput } from '../tbl-discipline/tbl-discipline-update-one-required-without-tbl-subdiscipline-nested.input'

@InputType()
export class tbl_subdisciplineUpdateWithoutTbl_classlistInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  description?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  maxPerformers?: NullableIntFieldUpdateOperationsInput

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  minPerformers?: NullableIntFieldUpdateOperationsInput

  @Field(() => Enumtbl_subdiscipline_SGSlabelFieldUpdateOperationsInput, {
    nullable: true,
  })
  SGSlabel?: Enumtbl_subdiscipline_SGSlabelFieldUpdateOperationsInput

  @Field(() => NullableDecimalFieldUpdateOperationsInput, { nullable: true })
  @Type(() => NullableDecimalFieldUpdateOperationsInput)
  price?: NullableDecimalFieldUpdateOperationsInput

  @Field(
    () => tbl_disciplineUpdateOneRequiredWithoutTbl_subdisciplineNestedInput,
    { nullable: true },
  )
  @Type(
    () => tbl_disciplineUpdateOneRequiredWithoutTbl_subdisciplineNestedInput,
  )
  tbl_discipline?: tbl_disciplineUpdateOneRequiredWithoutTbl_subdisciplineNestedInput
}
