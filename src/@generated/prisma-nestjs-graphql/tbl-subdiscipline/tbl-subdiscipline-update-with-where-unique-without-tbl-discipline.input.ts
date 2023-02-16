import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_subdisciplineWhereUniqueInput } from './tbl-subdiscipline-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_subdisciplineUpdateWithoutTbl_disciplineInput } from './tbl-subdiscipline-update-without-tbl-discipline.input'

@InputType()
export class tbl_subdisciplineUpdateWithWhereUniqueWithoutTbl_disciplineInput {
  @Field(() => tbl_subdisciplineWhereUniqueInput, { nullable: false })
  @Type(() => tbl_subdisciplineWhereUniqueInput)
  where!: tbl_subdisciplineWhereUniqueInput

  @Field(() => tbl_subdisciplineUpdateWithoutTbl_disciplineInput, {
    nullable: false,
  })
  @Type(() => tbl_subdisciplineUpdateWithoutTbl_disciplineInput)
  data!: tbl_subdisciplineUpdateWithoutTbl_disciplineInput
}
