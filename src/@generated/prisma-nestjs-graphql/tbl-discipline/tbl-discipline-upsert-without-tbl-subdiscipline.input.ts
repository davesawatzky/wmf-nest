import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_disciplineUpdateWithoutTbl_subdisciplineInput } from './tbl-discipline-update-without-tbl-subdiscipline.input'
import { Type } from 'class-transformer'
import { tbl_disciplineCreateWithoutTbl_subdisciplineInput } from './tbl-discipline-create-without-tbl-subdiscipline.input'

@InputType()
export class tbl_disciplineUpsertWithoutTbl_subdisciplineInput {
  @Field(() => tbl_disciplineUpdateWithoutTbl_subdisciplineInput, {
    nullable: false,
  })
  @Type(() => tbl_disciplineUpdateWithoutTbl_subdisciplineInput)
  update!: tbl_disciplineUpdateWithoutTbl_subdisciplineInput

  @Field(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput, {
    nullable: false,
  })
  @Type(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput)
  create!: tbl_disciplineCreateWithoutTbl_subdisciplineInput
}
