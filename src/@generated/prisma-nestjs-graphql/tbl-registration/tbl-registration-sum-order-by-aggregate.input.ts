import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'

@InputType()
export class tbl_registrationSumOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  userID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  totalAmt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  payedAmt?: keyof typeof SortOrder
}
