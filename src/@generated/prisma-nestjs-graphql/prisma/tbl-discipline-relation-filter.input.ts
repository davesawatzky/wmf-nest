import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_disciplineWhereInput } from '../tbl-discipline/tbl-discipline-where.input'

@InputType()
export class Tbl_disciplineRelationFilter {
  @Field(() => tbl_disciplineWhereInput, { nullable: true })
  is?: tbl_disciplineWhereInput

  @Field(() => tbl_disciplineWhereInput, { nullable: true })
  isNot?: tbl_disciplineWhereInput
}
