import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_trophyWhereInput } from '../tbl-trophy/tbl-trophy-where.input'

@InputType()
export class Tbl_trophyRelationFilter {
  @Field(() => tbl_trophyWhereInput, { nullable: true })
  is?: tbl_trophyWhereInput

  @Field(() => tbl_trophyWhereInput, { nullable: true })
  isNot?: tbl_trophyWhereInput
}
