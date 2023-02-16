import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_classesWhereInput } from '../tbl-reg-classes/tbl-reg-classes-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesOrderByWithAggregationInput } from '../tbl-reg-classes/tbl-reg-classes-order-by-with-aggregation.input'
import { Tbl_reg_classesScalarFieldEnum } from './tbl-reg-classes-scalar-field.enum'
import { tbl_reg_classesScalarWhereWithAggregatesInput } from '../tbl-reg-classes/tbl-reg-classes-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblRegClassesArgs {
  @Field(() => tbl_reg_classesWhereInput, { nullable: true })
  @Type(() => tbl_reg_classesWhereInput)
  where?: tbl_reg_classesWhereInput

  @Field(() => [tbl_reg_classesOrderByWithAggregationInput], { nullable: true })
  @Type(() => tbl_reg_classesOrderByWithAggregationInput)
  orderBy?: Array<tbl_reg_classesOrderByWithAggregationInput>

  @Field(() => [Tbl_reg_classesScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_reg_classesScalarFieldEnum>

  @Field(() => tbl_reg_classesScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_classesScalarWhereWithAggregatesInput)
  having?: tbl_reg_classesScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
