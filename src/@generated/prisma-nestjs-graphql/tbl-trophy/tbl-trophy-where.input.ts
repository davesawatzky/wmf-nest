import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { Tbl_class_trophyListRelationFilter } from '../prisma/tbl-class-trophy-list-relation-filter.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_trophyWhereInput {
  @Field(() => [tbl_trophyWhereInput], { nullable: true })
  AND?: Array<tbl_trophyWhereInput>

  @Field(() => [tbl_trophyWhereInput], { nullable: true })
  OR?: Array<tbl_trophyWhereInput>

  @Field(() => [tbl_trophyWhereInput], { nullable: true })
  NOT?: Array<tbl_trophyWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter

  @Field(() => StringNullableFilter, { nullable: true })
  description?: StringNullableFilter

  @Field(() => Tbl_class_trophyListRelationFilter, { nullable: true })
  @Type(() => Tbl_class_trophyListRelationFilter)
  tbl_class_trophy?: Tbl_class_trophyListRelationFilter
}
