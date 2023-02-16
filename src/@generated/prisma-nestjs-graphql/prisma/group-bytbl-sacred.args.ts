import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_sacredWhereInput } from '../tbl-sacred/tbl-sacred-where.input'
import { Type } from 'class-transformer'
import { tbl_sacredOrderByWithAggregationInput } from '../tbl-sacred/tbl-sacred-order-by-with-aggregation.input'
import { Tbl_sacredScalarFieldEnum } from './tbl-sacred-scalar-field.enum'
import { tbl_sacredScalarWhereWithAggregatesInput } from '../tbl-sacred/tbl-sacred-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblSacredArgs {
  @Field(() => tbl_sacredWhereInput, { nullable: true })
  @Type(() => tbl_sacredWhereInput)
  where?: tbl_sacredWhereInput

  @Field(() => [tbl_sacredOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<tbl_sacredOrderByWithAggregationInput>

  @Field(() => [Tbl_sacredScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_sacredScalarFieldEnum>

  @Field(() => tbl_sacredScalarWhereWithAggregatesInput, { nullable: true })
  having?: tbl_sacredScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
