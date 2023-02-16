import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_performerWhereInput } from '../tbl-reg-performer/tbl-reg-performer-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_performerOrderByWithAggregationInput } from '../tbl-reg-performer/tbl-reg-performer-order-by-with-aggregation.input'
import { Tbl_reg_performerScalarFieldEnum } from './tbl-reg-performer-scalar-field.enum'
import { tbl_reg_performerScalarWhereWithAggregatesInput } from '../tbl-reg-performer/tbl-reg-performer-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblRegPerformerArgs {
  @Field(() => tbl_reg_performerWhereInput, { nullable: true })
  @Type(() => tbl_reg_performerWhereInput)
  where?: tbl_reg_performerWhereInput

  @Field(() => [tbl_reg_performerOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: Array<tbl_reg_performerOrderByWithAggregationInput>

  @Field(() => [Tbl_reg_performerScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_reg_performerScalarFieldEnum>

  @Field(() => tbl_reg_performerScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: tbl_reg_performerScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
