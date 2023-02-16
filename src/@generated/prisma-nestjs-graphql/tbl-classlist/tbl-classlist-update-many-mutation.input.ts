import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input'
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input'
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input'
import { Enumtbl_SGSFieldUpdateOperationsInput } from '../prisma/enumtbl-sgs-field-update-operations.input'
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_classlistUpdateManyMutationInput {
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
}
