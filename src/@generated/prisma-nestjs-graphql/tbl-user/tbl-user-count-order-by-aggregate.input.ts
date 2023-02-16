import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'

@InputType()
export class tbl_userCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  email?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  password?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  staff?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  admin?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  firstName?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  lastName?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  apartment?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  streetNumber?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  streetName?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  city?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  province?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  postalCode?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  phone?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder
}
