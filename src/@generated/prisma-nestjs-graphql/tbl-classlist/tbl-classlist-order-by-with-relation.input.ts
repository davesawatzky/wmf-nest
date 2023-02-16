import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_categoryOrderByWithRelationInput } from '../tbl-category/tbl-category-order-by-with-relation.input'
import { Type } from 'class-transformer'
import { tbl_levelOrderByWithRelationInput } from '../tbl-level/tbl-level-order-by-with-relation.input'
import { tbl_subdisciplineOrderByWithRelationInput } from '../tbl-subdiscipline/tbl-subdiscipline-order-by-with-relation.input'
import { tbl_class_trophyOrderByRelationAggregateInput } from '../tbl-class-trophy/tbl-class-trophy-order-by-relation-aggregate.input'

@InputType()
export class tbl_classlistOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  classNumber?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  subdisciplineID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  categoryID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  levelID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  minSelection?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  maxSelection?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  requiredSelection?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  SGSlabel?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  price?: keyof typeof SortOrder

  @Field(() => tbl_categoryOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_categoryOrderByWithRelationInput)
  tbl_category?: tbl_categoryOrderByWithRelationInput

  @Field(() => tbl_levelOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_levelOrderByWithRelationInput)
  tbl_level?: tbl_levelOrderByWithRelationInput

  @Field(() => tbl_subdisciplineOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_subdisciplineOrderByWithRelationInput)
  tbl_subdiscipline?: tbl_subdisciplineOrderByWithRelationInput

  @Field(() => tbl_class_trophyOrderByRelationAggregateInput, {
    nullable: true,
  })
  @Type(() => tbl_class_trophyOrderByRelationAggregateInput)
  tbl_class_trophy?: tbl_class_trophyOrderByRelationAggregateInput
}
