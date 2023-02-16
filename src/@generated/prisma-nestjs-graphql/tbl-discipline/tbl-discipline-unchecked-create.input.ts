import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_subdisciplineUncheckedCreateNestedManyWithoutTbl_disciplineInput } from '../tbl-subdiscipline/tbl-subdiscipline-unchecked-create-nested-many-without-tbl-discipline.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_disciplineUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(
    () => tbl_subdisciplineUncheckedCreateNestedManyWithoutTbl_disciplineInput,
    { nullable: true },
  )
  @Type(
    () => tbl_subdisciplineUncheckedCreateNestedManyWithoutTbl_disciplineInput,
  )
  tbl_subdiscipline?: tbl_subdisciplineUncheckedCreateNestedManyWithoutTbl_disciplineInput
}
