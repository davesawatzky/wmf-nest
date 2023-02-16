import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_disciplineWhereInput } from '../tbl-discipline/tbl-discipline-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManytblDisciplineArgs {
  @Field(() => tbl_disciplineWhereInput, { nullable: true })
  @Type(() => tbl_disciplineWhereInput)
  where?: tbl_disciplineWhereInput
}
