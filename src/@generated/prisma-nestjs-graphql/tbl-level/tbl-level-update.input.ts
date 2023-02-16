import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input'
import { tbl_classlistUpdateManyWithoutTbl_levelNestedInput } from '../tbl-classlist/tbl-classlist-update-many-without-tbl-level-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_levelUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  description?: NullableStringFieldUpdateOperationsInput

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  order?: NullableIntFieldUpdateOperationsInput

  @Field(() => tbl_classlistUpdateManyWithoutTbl_levelNestedInput, {
    nullable: true,
  })
  @Type(() => tbl_classlistUpdateManyWithoutTbl_levelNestedInput)
  tbl_classlist?: tbl_classlistUpdateManyWithoutTbl_levelNestedInput
}
