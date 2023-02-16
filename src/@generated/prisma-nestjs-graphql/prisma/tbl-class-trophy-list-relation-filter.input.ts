import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_class_trophyWhereInput } from '../tbl-class-trophy/tbl-class-trophy-where.input'

@InputType()
export class Tbl_class_trophyListRelationFilter {
  @Field(() => tbl_class_trophyWhereInput, { nullable: true })
  every?: tbl_class_trophyWhereInput

  @Field(() => tbl_class_trophyWhereInput, { nullable: true })
  some?: tbl_class_trophyWhereInput

  @Field(() => tbl_class_trophyWhereInput, { nullable: true })
  none?: tbl_class_trophyWhereInput
}
