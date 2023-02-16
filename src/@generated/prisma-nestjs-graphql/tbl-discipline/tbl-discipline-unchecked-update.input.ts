import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { tbl_subdisciplineUncheckedUpdateManyWithoutTbl_disciplineNestedInput } from '../tbl-subdiscipline/tbl-subdiscipline-unchecked-update-many-without-tbl-discipline-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_disciplineUncheckedUpdateInput {
  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  id?: IntFieldUpdateOperationsInput

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput

  @Field(
    () => tbl_subdisciplineUncheckedUpdateManyWithoutTbl_disciplineNestedInput,
    { nullable: true },
  )
  @Type(
    () => tbl_subdisciplineUncheckedUpdateManyWithoutTbl_disciplineNestedInput,
  )
  tbl_subdiscipline?: tbl_subdisciplineUncheckedUpdateManyWithoutTbl_disciplineNestedInput
}
