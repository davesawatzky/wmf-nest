import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IntFilter } from '../prisma/int-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { IntNullableFilter } from '../prisma/int-nullable-filter.input'
import { Enumtbl_subdiscipline_SGSlabelFilter } from '../prisma/enumtbl-subdiscipline-sg-slabel-filter.input'
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input'
import { Tbl_disciplineRelationFilter } from '../prisma/tbl-discipline-relation-filter.input'
import { Tbl_classlistListRelationFilter } from '../prisma/tbl-classlist-list-relation-filter.input'

@InputType()
export class tbl_subdisciplineWhereInput {
  @Field(() => [tbl_subdisciplineWhereInput], { nullable: true })
  @Type(() => tbl_subdisciplineWhereInput)
  AND?: Array<tbl_subdisciplineWhereInput>

  @Field(() => [tbl_subdisciplineWhereInput], { nullable: true })
  @Type(() => tbl_subdisciplineWhereInput)
  OR?: Array<tbl_subdisciplineWhereInput>

  @Field(() => [tbl_subdisciplineWhereInput], { nullable: true })
  @Type(() => tbl_subdisciplineWhereInput)
  NOT?: Array<tbl_subdisciplineWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  disciplineID?: IntFilter

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter

  @Field(() => StringNullableFilter, { nullable: true })
  description?: StringNullableFilter

  @Field(() => IntNullableFilter, { nullable: true })
  maxPerformers?: IntNullableFilter

  @Field(() => IntNullableFilter, { nullable: true })
  minPerformers?: IntNullableFilter

  @Field(() => Enumtbl_subdiscipline_SGSlabelFilter, { nullable: true })
  SGSlabel?: Enumtbl_subdiscipline_SGSlabelFilter

  @Field(() => DecimalNullableFilter, { nullable: true })
  @Type(() => DecimalNullableFilter)
  price?: DecimalNullableFilter

  @Field(() => Tbl_disciplineRelationFilter, { nullable: true })
  @Type(() => Tbl_disciplineRelationFilter)
  tbl_discipline?: Tbl_disciplineRelationFilter

  @Field(() => Tbl_classlistListRelationFilter, { nullable: true })
  @Type(() => Tbl_classlistListRelationFilter)
  tbl_classlist?: Tbl_classlistListRelationFilter
}
