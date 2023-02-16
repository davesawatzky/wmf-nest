import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_disciplineUpdateManyMutationInput } from '../tbl-discipline/tbl-discipline-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_disciplineWhereInput } from '../tbl-discipline/tbl-discipline-where.input'

@ArgsType()
export class UpdateManytblDisciplineArgs {
  @Field(() => tbl_disciplineUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_disciplineUpdateManyMutationInput)
  data!: tbl_disciplineUpdateManyMutationInput

  @Field(() => tbl_disciplineWhereInput, { nullable: true })
  @Type(() => tbl_disciplineWhereInput)
  where?: tbl_disciplineWhereInput
}
