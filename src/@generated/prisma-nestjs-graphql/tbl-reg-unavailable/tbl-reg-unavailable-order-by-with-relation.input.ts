import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_reg_groupOrderByWithRelationInput } from '../tbl-reg-group/tbl-reg-group-order-by-with-relation.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_unavailableOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  groupID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  date?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  time?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => tbl_reg_groupOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_reg_groupOrderByWithRelationInput)
  tbl_reg_group?: tbl_reg_groupOrderByWithRelationInput
}
