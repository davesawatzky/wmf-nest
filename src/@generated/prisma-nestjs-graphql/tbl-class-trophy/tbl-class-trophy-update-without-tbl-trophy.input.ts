import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput } from '../tbl-classlist/tbl-classlist-update-one-required-without-tbl-class-trophy-nested.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_class_trophyUpdateWithoutTbl_trophyInput {
  @Field(
    () => tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput,
    { nullable: true },
  )
  @Type(() => tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput)
  tbl_classlist?: tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput
}
