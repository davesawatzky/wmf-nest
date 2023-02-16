import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_unavailableWhereInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_unavailableOrderByWithAggregationInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-order-by-with-aggregation.input'
import { Tbl_reg_unavailableScalarFieldEnum } from './tbl-reg-unavailable-scalar-field.enum'
import { tbl_reg_unavailableScalarWhereWithAggregatesInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblRegUnavailableArgs {
  @Field(() => tbl_reg_unavailableWhereInput, { nullable: true })
  @Type(() => tbl_reg_unavailableWhereInput)
  where?: tbl_reg_unavailableWhereInput

  @Field(() => [tbl_reg_unavailableOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: Array<tbl_reg_unavailableOrderByWithAggregationInput>

  @Field(() => [Tbl_reg_unavailableScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_reg_unavailableScalarFieldEnum>

  @Field(() => tbl_reg_unavailableScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: tbl_reg_unavailableScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
