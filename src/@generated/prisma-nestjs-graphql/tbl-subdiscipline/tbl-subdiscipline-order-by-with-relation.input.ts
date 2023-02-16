import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_disciplineOrderByWithRelationInput } from '../tbl-discipline/tbl-discipline-order-by-with-relation.input'
import { Type } from 'class-transformer'
import { tbl_classlistOrderByRelationAggregateInput } from '../tbl-classlist/tbl-classlist-order-by-relation-aggregate.input'

@InputType()
export class tbl_subdisciplineOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  disciplineID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  maxPerformers?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  minPerformers?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  SGSlabel?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  price?: keyof typeof SortOrder

  @Field(() => tbl_disciplineOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_disciplineOrderByWithRelationInput)
  tbl_discipline?: tbl_disciplineOrderByWithRelationInput

  @Field(() => tbl_classlistOrderByRelationAggregateInput, { nullable: true })
  @Type(() => tbl_classlistOrderByRelationAggregateInput)
  tbl_classlist?: tbl_classlistOrderByRelationAggregateInput
}
