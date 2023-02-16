import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_trophyWhereInput } from '../tbl-trophy/tbl-trophy-where.input'
import { Type } from 'class-transformer'
import { tbl_trophyOrderByWithAggregationInput } from '../tbl-trophy/tbl-trophy-order-by-with-aggregation.input'
import { Tbl_trophyScalarFieldEnum } from './tbl-trophy-scalar-field.enum'
import { tbl_trophyScalarWhereWithAggregatesInput } from '../tbl-trophy/tbl-trophy-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblTrophyArgs {
  @Field(() => tbl_trophyWhereInput, { nullable: true })
  @Type(() => tbl_trophyWhereInput)
  where?: tbl_trophyWhereInput

  @Field(() => [tbl_trophyOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<tbl_trophyOrderByWithAggregationInput>

  @Field(() => [Tbl_trophyScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_trophyScalarFieldEnum>

  @Field(() => tbl_trophyScalarWhereWithAggregatesInput, { nullable: true })
  having?: tbl_trophyScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
