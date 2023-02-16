import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_trophyInput } from '../tbl-class-trophy/tbl-class-trophy-unchecked-create-nested-many-without-tbl-trophy.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_trophyUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(
    () => tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_trophyInput,
    { nullable: true },
  )
  @Type(() => tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_trophyInput)
  tbl_class_trophy?: tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_trophyInput
}
