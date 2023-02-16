import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_reg_classesOrderByWithRelationInput } from '../tbl-reg-classes/tbl-reg-classes-order-by-with-relation.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_selectionOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  classpickID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  largerWork?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  movement?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  composer?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  duration?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder

  @Field(() => tbl_reg_classesOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_reg_classesOrderByWithRelationInput)
  tbl_reg_classes?: tbl_reg_classesOrderByWithRelationInput
}
