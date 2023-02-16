import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IntFilter } from '../prisma/int-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { Enumtbl_SGSFilter } from '../prisma/enumtbl-sgs-filter.input'
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input'
import { Tbl_categoryRelationFilter } from '../prisma/tbl-category-relation-filter.input'
import { Tbl_levelRelationFilter } from '../prisma/tbl-level-relation-filter.input'
import { Tbl_subdisciplineRelationFilter } from '../prisma/tbl-subdiscipline-relation-filter.input'
import { Tbl_class_trophyListRelationFilter } from '../prisma/tbl-class-trophy-list-relation-filter.input'

@InputType()
export class tbl_classlistWhereInput {
  @Field(() => [tbl_classlistWhereInput], { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  AND?: Array<tbl_classlistWhereInput>

  @Field(() => [tbl_classlistWhereInput], { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  OR?: Array<tbl_classlistWhereInput>

  @Field(() => [tbl_classlistWhereInput], { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  NOT?: Array<tbl_classlistWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => StringFilter, { nullable: true })
  classNumber?: StringFilter

  @Field(() => IntFilter, { nullable: true })
  subdisciplineID?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  categoryID?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  levelID?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  minSelection?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  maxSelection?: IntFilter

  @Field(() => StringNullableFilter, { nullable: true })
  requiredSelection?: StringNullableFilter

  @Field(() => Enumtbl_SGSFilter, { nullable: true })
  SGSlabel?: Enumtbl_SGSFilter

  @Field(() => DecimalNullableFilter, { nullable: true })
  @Type(() => DecimalNullableFilter)
  price?: DecimalNullableFilter

  @Field(() => Tbl_categoryRelationFilter, { nullable: true })
  @Type(() => Tbl_categoryRelationFilter)
  tbl_category?: Tbl_categoryRelationFilter

  @Field(() => Tbl_levelRelationFilter, { nullable: true })
  @Type(() => Tbl_levelRelationFilter)
  tbl_level?: Tbl_levelRelationFilter

  @Field(() => Tbl_subdisciplineRelationFilter, { nullable: true })
  @Type(() => Tbl_subdisciplineRelationFilter)
  tbl_subdiscipline?: Tbl_subdisciplineRelationFilter

  @Field(() => Tbl_class_trophyListRelationFilter, { nullable: true })
  @Type(() => Tbl_class_trophyListRelationFilter)
  tbl_class_trophy?: Tbl_class_trophyListRelationFilter
}
