import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_disciplineUpdateInput } from '../tbl-discipline/tbl-discipline-update.input'
import { Type } from 'class-transformer'
import { tbl_disciplineWhereUniqueInput } from '../tbl-discipline/tbl-discipline-where-unique.input'

@ArgsType()
export class UpdateOnetblDisciplineArgs {
  @Field(() => tbl_disciplineUpdateInput, { nullable: false })
  @Type(() => tbl_disciplineUpdateInput)
  data!: tbl_disciplineUpdateInput

  @Field(() => tbl_disciplineWhereUniqueInput, { nullable: false })
  @Type(() => tbl_disciplineWhereUniqueInput)
  where!: tbl_disciplineWhereUniqueInput
}
