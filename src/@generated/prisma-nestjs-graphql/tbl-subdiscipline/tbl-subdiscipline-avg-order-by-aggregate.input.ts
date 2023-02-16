import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'

@InputType()
export class tbl_subdisciplineAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  disciplineID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  maxPerformers?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  minPerformers?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  price?: keyof typeof SortOrder
}
