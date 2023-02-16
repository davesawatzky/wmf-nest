import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'

@InputType()
export class tbl_registrationMaxOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  userID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  label?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  performerType?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  submittedAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  totalAmt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  payedAmt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  transactionInfo?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  confirmation?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder
}
