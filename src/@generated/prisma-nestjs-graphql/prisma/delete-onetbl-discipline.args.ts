import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_disciplineWhereUniqueInput } from '../tbl-discipline/tbl-discipline-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteOnetblDisciplineArgs {
  @Field(() => tbl_disciplineWhereUniqueInput, { nullable: false })
  @Type(() => tbl_disciplineWhereUniqueInput)
  where!: tbl_disciplineWhereUniqueInput
}
