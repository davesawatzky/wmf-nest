import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_class_trophyOrderByRelationAggregateInput } from '../tbl-class-trophy/tbl-class-trophy-order-by-relation-aggregate.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_trophyOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder

  @Field(() => tbl_class_trophyOrderByRelationAggregateInput, {
    nullable: true,
  })
  @Type(() => tbl_class_trophyOrderByRelationAggregateInput)
  tbl_class_trophy?: tbl_class_trophyOrderByRelationAggregateInput
}
