import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_class_trophyCreateNestedManyWithoutTbl_trophyInput } from '../tbl-class-trophy/tbl-class-trophy-create-nested-many-without-tbl-trophy.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_trophyCreateInput {
  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => tbl_class_trophyCreateNestedManyWithoutTbl_trophyInput, {
    nullable: true,
  })
  @Type(() => tbl_class_trophyCreateNestedManyWithoutTbl_trophyInput)
  tbl_class_trophy?: tbl_class_trophyCreateNestedManyWithoutTbl_trophyInput
}
