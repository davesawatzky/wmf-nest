import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_userOrderByWithRelationInput } from '../tbl-user/tbl-user-order-by-with-relation.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesOrderByRelationAggregateInput } from '../tbl-reg-classes/tbl-reg-classes-order-by-relation-aggregate.input'
import { tbl_reg_communityOrderByRelationAggregateInput } from '../tbl-reg-community/tbl-reg-community-order-by-relation-aggregate.input'
import { tbl_reg_groupOrderByRelationAggregateInput } from '../tbl-reg-group/tbl-reg-group-order-by-relation-aggregate.input'
import { tbl_reg_performerOrderByRelationAggregateInput } from '../tbl-reg-performer/tbl-reg-performer-order-by-relation-aggregate.input'
import { tbl_reg_schoolOrderByWithRelationInput } from '../tbl-reg-school/tbl-reg-school-order-by-with-relation.input'
import { tbl_reg_teacherOrderByWithRelationInput } from '../tbl-reg-teacher/tbl-reg-teacher-order-by-with-relation.input'

@InputType()
export class tbl_registrationOrderByWithRelationInput {
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

  @Field(() => tbl_userOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_userOrderByWithRelationInput)
  tbl_user?: tbl_userOrderByWithRelationInput

  @Field(() => tbl_reg_classesOrderByRelationAggregateInput, { nullable: true })
  @Type(() => tbl_reg_classesOrderByRelationAggregateInput)
  tbl_reg_classes?: tbl_reg_classesOrderByRelationAggregateInput

  @Field(() => tbl_reg_communityOrderByRelationAggregateInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_communityOrderByRelationAggregateInput)
  tbl_reg_community?: tbl_reg_communityOrderByRelationAggregateInput

  @Field(() => tbl_reg_groupOrderByRelationAggregateInput, { nullable: true })
  @Type(() => tbl_reg_groupOrderByRelationAggregateInput)
  tbl_reg_group?: tbl_reg_groupOrderByRelationAggregateInput

  @Field(() => tbl_reg_performerOrderByRelationAggregateInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_performerOrderByRelationAggregateInput)
  tbl_reg_performer?: tbl_reg_performerOrderByRelationAggregateInput

  @Field(() => tbl_reg_schoolOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_reg_schoolOrderByWithRelationInput)
  tbl_reg_school?: tbl_reg_schoolOrderByWithRelationInput

  @Field(() => tbl_reg_teacherOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_reg_teacherOrderByWithRelationInput)
  tbl_reg_teacher?: tbl_reg_teacherOrderByWithRelationInput
}
