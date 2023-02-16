import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_disciplineWhereUniqueInput } from './tbl-discipline-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_disciplineCreateWithoutTbl_subdisciplineInput } from './tbl-discipline-create-without-tbl-subdiscipline.input'

@InputType()
export class tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput {
  @Field(() => tbl_disciplineWhereUniqueInput, { nullable: false })
  @Type(() => tbl_disciplineWhereUniqueInput)
  where!: tbl_disciplineWhereUniqueInput

  @Field(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput, {
    nullable: false,
  })
  @Type(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput)
  create!: tbl_disciplineCreateWithoutTbl_subdisciplineInput
}
